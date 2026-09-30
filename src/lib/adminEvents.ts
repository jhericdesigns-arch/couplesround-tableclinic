const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-events`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export interface AdminEvent {
  id: string;
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

export async function fetchPublishedEvents(): Promise<AdminEvent[]> {
  const res = await fetch(EDGE_FUNCTION_URL, {
    headers: { Authorization: `Bearer ${ANON_KEY}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch events (${res.status})`);
  const json = await res.json();
  return json.events || [];
}

export async function fetchAllEvents(password: string): Promise<AdminEvent[]> {
  const res = await fetch(`${EDGE_FUNCTION_URL}?all=true`, {
    headers: { Authorization: `Bearer ${password}` },
  });
  if (!res.ok) throw new Error('Invalid admin password');
  const json = await res.json();
  return json.events || [];
}

export async function createEvent(password: string, data: Omit<AdminEvent, 'id'>): Promise<AdminEvent> {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
    body: JSON.stringify({ ...data, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create event');
  }
  const json = await res.json();
  return json.event;
}

export async function updateEvent(password: string, id: string, data: Omit<AdminEvent, 'id'>): Promise<AdminEvent> {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
    body: JSON.stringify({ ...data, id, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update event');
  }
  const json = await res.json();
  return json.event;
}

export async function deleteEvent(password: string, id: string): Promise<void> {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
    body: JSON.stringify({ id, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete event');
  }
}
