import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD") || "sika-admin-2026";

interface EventPayload {
  id?: string;
  title: string;
  description: string;
  event_date: string;
  end_date: string | null;
  location: string | null;
  price: number | null;
  capacity: number | null;
  image_url: string | null;
  registration_url: string | null;
  is_published: boolean;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const url = new URL(req.url);
    const method = req.method;

    // ── Auth check: verify admin password ──
    const authHeader = req.headers.get("Authorization");
    const body = method === "GET" ? null : await req.json().catch(() => ({}));
    const password = body?.password || (authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null);

    // GET with no password → return published events (public read)
    // GET with password → return ALL events (admin read)
    // POST/PUT/DELETE → require password
    const isAdmin = password === ADMIN_PASSWORD;

    if (method !== "GET" && !isAdmin) {
      return new Response(
        JSON.stringify({ error: "Unauthorized. Admin password required." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // ── GET: list events ──
    if (method === "GET") {
      let query = supabase.from("live_events").select("*").order("event_date", { ascending: true });
      if (!isAdmin) {
        query = query.eq("is_published", true);
      }
      const { data, error } = await query;
      if (error) throw error;
      return new Response(JSON.stringify({ events: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── POST: create event ──
    if (method === "POST") {
      const { password: _pw, ...eventData } = body as EventPayload & { password: string };
      const { data, error } = await supabase
        .from("live_events")
        .insert({
          title: eventData.title,
          description: eventData.description,
          event_date: eventData.event_date,
          end_date: eventData.end_date || null,
          location: eventData.location,
          price: eventData.price,
          capacity: eventData.capacity,
          image_url: eventData.image_url,
          registration_url: eventData.registration_url,
          is_published: eventData.is_published,
        })
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ event: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── PUT: update event ──
    if (method === "PUT") {
      const { password: _pw, id, ...eventData } = body as EventPayload & { password: string };
      if (!id) {
        return new Response(
          JSON.stringify({ error: "Event ID is required for updates." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const { data, error } = await supabase
        .from("live_events")
        .update({
          title: eventData.title,
          description: eventData.description,
          event_date: eventData.event_date,
          end_date: eventData.end_date || null,
          location: eventData.location,
          price: eventData.price,
          capacity: eventData.capacity,
          image_url: eventData.image_url,
          registration_url: eventData.registration_url,
          is_published: eventData.is_published,
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ event: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── DELETE: remove event ──
    if (method === "DELETE") {
      const { password: _pw, id } = body as { password: string; id: string };
      if (!id) {
        return new Response(
          JSON.stringify({ error: "Event ID is required for deletion." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const { error } = await supabase.from("live_events").delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
