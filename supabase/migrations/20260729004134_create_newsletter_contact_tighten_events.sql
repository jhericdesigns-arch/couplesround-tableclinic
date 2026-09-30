/*
# Add newsletter + contact tables, tighten live_events security

## 1. New Tables

### newsletter_subscribers
- `id` (uuid, primary key)
- `email` (text, unique, not null) — subscriber's email address
- `first_name` (text, nullable) — optional name from popup form
- `created_at` (timestamptz, default now())

### contact_messages
- `id` (uuid, primary key)
- `name` (text, not null) — sender's full name
- `email` (text, not null) — sender's email for replies
- `subject` (text, nullable) — optional subject line
- `message` (text, not null) — the body of the contact message
- `created_at` (timestamptz, default now())
- `is_read` (boolean, default false) — lets the owner track which messages are new

## 2. Security Changes

### newsletter_subscribers
- RLS enabled.
- Public (anon + authenticated) can INSERT — visitors subscribe from the popup.
- NO public SELECT/UPDATE/DELETE — subscriber list is private to the owner.
  (The owner reads/manages subscribers via the Supabase dashboard or authenticated admin tooling.)

### contact_messages
- RLS enabled.
- Public (anon + authenticated) can INSERT — visitors submit the contact form.
- NO public SELECT/UPDATE/DELETE — messages are private to the owner.

### live_events (MODIFIED — tightened)
- SELECT policy unchanged: anon can read published events only.
  (The previous policy used `is_published = true OR true` which leaked unpublished
   events to the public. Fixed to `is_published = true`.)
- INSERT / UPDATE / DELETE policies: REMOVED for anon. Now only authenticated
  users (the owner via the admin edge function using the service role key) can
  write. This prevents public visitors from creating, editing, or deleting events.
- The admin edge function (deployed separately) uses the SUPABASE_SERVICE_ROLE_KEY
  which bypasses RLS entirely, so it can still perform all CRUD operations after
  verifying the admin password.

## 3. Important Notes
1. Newsletter and contact data are write-only from the public internet —
   visitors can submit but cannot read other people's submissions.
2. The owner accesses collected leads through the Supabase dashboard.
3. live_events is now read-only for the public; all writes go through the
   password-protected edge function.
*/

-- ── newsletter_subscribers ──
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_subscribers" ON newsletter_subscribers;
CREATE POLICY "public_insert_subscribers" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies = public cannot read or modify subscriber data

-- ── contact_messages ──
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_messages" ON contact_messages;
CREATE POLICY "public_insert_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies = public cannot read or modify messages

-- ── live_events: tighten existing policies ──

-- Fix SELECT: only published events visible to public (was leaking drafts via `OR true`)
DROP POLICY IF EXISTS "anon_select_published_events" ON live_events;
CREATE POLICY "anon_select_published_events" ON live_events FOR SELECT
  TO anon, authenticated USING (is_published = true);

-- Add a separate SELECT for authenticated so the admin (edge function w/ service role
-- bypasses RLS anyway, but authenticated users in the dashboard can see all events)
DROP POLICY IF EXISTS "auth_select_all_events" ON live_events;
CREATE POLICY "auth_select_all_events" ON live_events FOR SELECT
  TO authenticated USING (true);

-- REMOVE open write policies — public can no longer create/edit/delete events
DROP POLICY IF EXISTS "anon_insert_events" ON live_events;
DROP POLICY IF EXISTS "anon_update_events" ON live_events;
DROP POLICY IF EXISTS "anon_delete_events" ON live_events;

-- Only authenticated users can write (edge function uses service role which bypasses RLS)
DROP POLICY IF EXISTS "auth_insert_events" ON live_events;
CREATE POLICY "auth_insert_events" ON live_events FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_events" ON live_events;
CREATE POLICY "auth_update_events" ON live_events FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_events" ON live_events;
CREATE POLICY "auth_delete_events" ON live_events FOR DELETE
  TO authenticated USING (true);

-- Index for faster queries on published events ordered by date
CREATE INDEX IF NOT EXISTS idx_live_events_published_date
  ON live_events (event_date) WHERE is_published = true;
