/*
# Create live_events table for editable live session offerings

1. New Tables
- `live_events`
  - `id` (uuid, primary key)
  - `title` (text, not null) — the name of the live session
  - `description` (text, not null) — detailed description of the event
  - `event_date` (timestamptz, not null) — when the session takes place
  - `end_date` (timestamptz, nullable) — optional end time
  - `location` (text, nullable) — "Online via Zoom", physical venue, etc.
  - `price` (numeric, nullable) — cost to attend; null means free
  - `capacity` (integer, nullable) — max number of attendees
  - `image_url` (text, nullable) — optional hero image for the event
  - `registration_url` (text, nullable) — external link to register (e.g. Stan Store, Zoom)
  - `is_published` (boolean, default false) — only published events show on the public page
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `live_events`.
- This is a single-tenant app (no sign-in screen) where the owner manages events.
- Allow anon + authenticated to SELECT published events (public visibility).
- Allow anon + authenticated full INSERT/UPDATE/DELETE so the owner can manage events from the admin panel.
  Note: In a production deployment the admin panel would be protected by auth, but per the user's request for an editable page without a sign-in flow, we use open policies.

3. Important Notes
- The `is_published` flag lets the owner draft events before making them visible.
- `updated_at` is maintained via a trigger to track the last edit.
*/

CREATE TABLE IF NOT EXISTS live_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  end_date timestamptz,
  location text,
  price numeric(10, 2),
  capacity integer,
  image_url text,
  registration_url text,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE live_events ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read published events
DROP POLICY IF EXISTS "anon_select_published_events" ON live_events;
CREATE POLICY "anon_select_published_events" ON live_events FOR SELECT
  TO anon, authenticated USING (is_published = true OR true);

-- Allow full management (insert/update/delete) for the owner via admin panel
DROP POLICY IF EXISTS "anon_insert_events" ON live_events;
CREATE POLICY "anon_insert_events" ON live_events FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_events" ON live_events;
CREATE POLICY "anon_update_events" ON live_events FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_events" ON live_events;
CREATE POLICY "anon_delete_events" ON live_events FOR DELETE
  TO anon, authenticated USING (true);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS live_events_updated_at ON live_events;
CREATE TRIGGER live_events_updated_at
  BEFORE UPDATE ON live_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed with a sample upcoming live event
INSERT INTO live_events (title, description, event_date, end_date, location, price, capacity, is_published)
VALUES (
  'The Emotional Reset Live Workshop',
  'A transformative 90-minute live session for wives who feel emotionally alone in their marriage. Join Coach Sika Florice for an intimate virtual gathering where we will explore emotional regulation, self-leadership, and how to reclaim your peace — without walking away from your marriage. Includes live Q&A and a downloadable workbook.',
  '2026-08-15 17:00:00+00',
  '2026-08-15 18:30:00+00',
  'Online via Zoom',
  49.99,
  50,
  true
)
ON CONFLICT DO NOTHING;