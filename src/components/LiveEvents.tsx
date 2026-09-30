import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  fetchAllEvents, createEvent, updateEvent, deleteEvent,
  type AdminEvent,
} from '@/lib/adminEvents';
import { useInView, useParallax } from '@/hooks/useInView';
import {
  Calendar, Clock, MapPin, Users, ExternalLink, Sparkles,
  Video, Plus, Edit, Trash2, Save, X, Heart, ArrowRight,
  Shield, Brain, Compass, Lock, Eye, EyeOff, LogOut,
  Radio,
} from 'lucide-react';

const emptyEvent: Omit<AdminEvent, 'id'> = {
  title: '',
  description: '',
  event_date: '',
  end_date: null,
  location: 'Online via Zoom',
  price: null,
  capacity: null,
  image_url: null,
  registration_url: 'https://stan.store/sikaflorice',
  is_published: true,
};

const whatToExpect = [
  { icon: Shield, title: 'Emotional Safety', desc: 'A confidential, judgment-free space where your pain is honored and your voice matters.' },
  { icon: Brain, title: 'Real Clarity', desc: 'Walk away with practical tools to regulate your emotions and lead yourself with confidence.' },
  { icon: Compass, title: 'Shared Journey', desc: 'Connect with other wives who understand exactly what you are going through.' },
];

export default function LiveEvents() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { ref: heroRef, inView: heroIn } = useInView<HTMLDivElement>();
  const { ref: expectRef, inView: expectIn } = useInView<HTMLDivElement>();
  const { ref: ctaRef, inView: ctaIn } = useInView<HTMLDivElement>();
  const parallaxImg = useParallax(0.25);

  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Admin auth state
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Edit/create state
  const [editingEvent, setEditingEvent] = useState<AdminEvent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<AdminEvent, 'id'>>(emptyEvent);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    setLoading(true);
    setError(null);
    const { data, error: fetchErr } = await supabase
      .from('live_events')
      .select('*')
      .order('event_date', { ascending: true });
    if (fetchErr) {
      setError('Unable to load live events. Please try again later.');
    } else {
      setEvents((data || []) as AdminEvent[]);
    }
    setLoading(false);
  }

  // ── Admin login ──
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    try {
      await fetchAllEvents(passwordInput);
      setAdminUnlocked(true);
      setShowLogin(false);
      setPasswordInput('');
    } catch {
      setLoginError('Incorrect password. Please try again.');
    }
  }

  function handleLogout() {
    setAdminUnlocked(false);
    setEditingEvent(null);
    setIsCreating(false);
  }

  function startCreate() {
    setIsCreating(true);
    setEditingEvent(null);
    setFormData(emptyEvent);
  }

  function startEdit(ev: AdminEvent) {
    setEditingEvent(ev);
    setIsCreating(false);
    setFormData({
      title: ev.title,
      description: ev.description,
      event_date: ev.event_date ? ev.event_date.slice(0, 16) : '',
      end_date: ev.end_date ? ev.end_date.slice(0, 16) : null,
      location: ev.location,
      price: ev.price,
      capacity: ev.capacity,
      image_url: ev.image_url,
      registration_url: ev.registration_url,
      is_published: ev.is_published,
    });
  }

  function cancelEdit() {
    setEditingEvent(null);
    setIsCreating(false);
    setFormData(emptyEvent);
  }

  async function saveEvent() {
    if (!formData.title.trim() || !formData.description.trim() || !formData.event_date) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        event_date: formData.event_date ? new Date(formData.event_date).toISOString() : '',
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
        location: formData.location,
        price: formData.price,
        capacity: formData.capacity,
        image_url: formData.image_url,
        registration_url: formData.registration_url,
        is_published: formData.is_published,
      };
      if (editingEvent) {
        await updateEvent(passwordInput || sessionStorage.getItem('admin_pw') || '', editingEvent.id, payload);
      } else {
        await createEvent(passwordInput || sessionStorage.getItem('admin_pw') || '', payload);
      }
      cancelEdit();
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save event.');
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this live event? This cannot be undone.')) return;
    try {
      await deleteEvent(passwordInput || sessionStorage.getItem('admin_pw') || '', id);
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event.');
    }
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
  const formatTime = (d: string) =>
    new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const publishedEvents = events.filter((e) => e.is_published);
  const showForm = isCreating || editingEvent !== null;
  const displayEvents = adminUnlocked ? events : publishedEvents;

  return (
    <section id="events" className="relative">
      {/* ═══ HERO ═══ */}
      <div ref={heroRef} className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 parallax-container">
          <div
            ref={parallaxImg}
            className="absolute inset-[-10%] bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url('/images/live-events/IMG-20260728-WA0040.jpg')` }}
          />
          <div className="absolute inset-0 bg-espresso/90" />
          <div className="absolute inset-0 bg-gradient-to-br from-blush-900/85 via-espresso/70 to-plum-900/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
        </div>

        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blush-300/10 blur-3xl animate-float z-0" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-plum-300/10 blur-3xl animate-float z-0" style={{ animationDelay: '2s' }} />

        <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 ${heroIn ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass shadow-soft mb-8">
            <Sparkles className="w-4 h-4 text-blush-300" />
            <span className="text-sm font-medium text-white tracking-wide" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>Live Events</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.1] mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            Come Sit With Me
            <br />
            <span className="italic" style={{ background: 'linear-gradient(135deg, #fde3f2 0%, #f99dd5 50%, #f565b5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.4))' }}>
              Live &amp; In Real Time
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            You have been carrying it all alone. These live sessions are your space
            to set it down — to breathe, to be seen, and to heal alongside other
            wives who truly understand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#upcoming-events" className="group px-8 py-4 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-premium hover:shadow-luxe hover:scale-105 transition-all duration-300 flex items-center gap-2">
              View Upcoming Sessions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://stan.store/sikaflorice" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-white/40 text-white font-semibold backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              Register on Stan Store
            </a>
          </div>
        </div>
      </div>

      {/* ═══ WHAT TO EXPECT ═══ */}
      <div ref={expectRef} className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blush-100/40 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`text-center max-w-2xl mx-auto mb-14 ${expectIn ? 'animate-fade-up' : 'opacity-0'}`}>
            <span className="text-sm tracking-[0.2em] uppercase text-blush-500 font-semibold">What To Expect</span>
            <h2 className="font-serif text-4xl md:text-5xl text-espresso mt-4 mb-4 leading-tight">
              A Space Built For <span className="text-gradient-blush">You</span>
            </h2>
            <p className="text-mocha leading-relaxed">
              Every live session is intentionally designed to meet you in your loneliest
              moments and guide you toward clarity, peace, and emotional leadership.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whatToExpect.map((item, i) => (
              <div key={item.title} className={`group p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-blush-100 shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-2 ${expectIn ? 'reveal-scale-visible' : 'reveal-scale'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blush-400 to-plum-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl text-espresso mb-3">{item.title}</h3>
                <p className="text-sm text-mocha leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ HOST IN SESSION ═══ */}
      <div ref={ctaRef} className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 parallax-container">
          <div className="absolute inset-[-10%] bg-cover bg-center will-change-transform" style={{ backgroundImage: `url('/images/live-events/IMG-20260728-WA0044.jpg')` }} />
          <div className="absolute inset-0 bg-espresso/92" />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/75 to-blush-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-espresso/60" />
        </div>
        <div className="relative z-10 py-24 md:py-32 max-w-7xl mx-auto px-6">
          <div className={`max-w-xl text-white ${ctaIn ? 'animate-slide-right' : 'opacity-0'}`}>
            <span className="text-sm tracking-[0.2em] uppercase text-blush-200 font-semibold" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>The Experience</span>
            <h2 className="font-serif text-4xl md:text-6xl mt-4 mb-6 leading-tight text-white" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
              Real Women. <br /> Real Healing. <br />
              <span className="text-blush-200 italic">Real Time.</span>
            </h2>
            <p className="text-lg text-white leading-relaxed mb-8" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
              When you join a live session, you are not just watching a video.
              You are stepping into a sacred space where your loneliness is witnessed,
              your pain is honored, and your next step becomes clear. This is where
              the silent tears turn into spoken breakthroughs.
            </p>
            <div className="space-y-3 mb-8">
              {['Live Q&A with Coach Sika Florice', 'Guided emotional regulation exercises', 'Community of wives who get it', 'Downloadable session workbook'].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 ${ctaIn ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                  <div className="w-6 h-6 rounded-full bg-blush-400/30 border border-blush-300/50 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-3 h-3 text-blush-200" fill="currentColor" />
                  </div>
                  <span className="text-white text-sm" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="#upcoming-events" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-premium hover:shadow-luxe hover:scale-105 transition-all duration-300 group">
              Find Your Session
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* ═══ UPCOMING EVENTS ═══ */}
      <div ref={ref} className="py-24 md:py-32 bg-mesh relative overflow-hidden" id="upcoming-events">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-plum-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blush-200/40 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-12 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            <span className="text-sm tracking-[0.2em] uppercase text-blush-500 font-semibold">Upcoming Sessions</span>
            <h2 className="font-serif text-4xl md:text-6xl text-espresso mt-4 mb-6 leading-tight">
              Save Your <span className="text-gradient-blush">Seat</span>
            </h2>
            <p className="text-lg text-mocha leading-relaxed">
              Each session has limited capacity to keep the space intimate.
              Reserve your spot before they are gone.
            </p>
          </div>

          {/* Admin access area */}
          <div className="flex justify-center mb-8">
            {adminUnlocked ? (
              <div className="flex items-center gap-3">
                {!showForm && (
                  <button onClick={startCreate} className="px-6 py-3 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add New Live Event
                  </button>
                )}
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blush-50 text-blush-600 text-xs font-semibold">
                  <Shield className="w-3.5 h-3.5" /> Admin Mode
                </span>
                <button onClick={handleLogout} className="text-xs text-mocha/60 hover:text-blush-500 transition-colors flex items-center gap-1.5">
                  <LogOut className="w-3.5 h-3.5" /> Exit
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="text-xs text-mocha/40 hover:text-blush-500 transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" /> Admin
              </button>
            )}
          </div>

          {/* Admin login form */}
          {showLogin && !adminUnlocked && (
            <div className="max-w-md mx-auto mb-8 glass rounded-3xl shadow-premium p-6 animate-scale-in">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-4 h-4 text-blush-500" />
                <h3 className="font-serif text-lg text-espresso">Admin Access</h3>
              </div>
              <p className="text-xs text-mocha mb-4">Enter your admin password to manage live events.</p>
              <form onSubmit={handleLogin} className="space-y-3">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Admin password"
                    autoFocus
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso text-sm"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mocha/50 hover:text-blush-500">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginError && <p className="text-rose-600 text-xs text-center">{loginError}</p>}
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 py-3 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold text-sm shadow-soft hover:shadow-premium transition-all duration-300">
                    Unlock
                  </button>
                  <button type="button" onClick={() => { setShowLogin(false); setLoginError(''); }} className="px-5 py-3 rounded-full glass text-espresso font-semibold text-sm hover:scale-105 transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Edit/Create form */}
          {adminUnlocked && showForm && (
            <div className="max-w-2xl mx-auto mb-12 glass rounded-3xl shadow-premium p-8 animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-espresso">{editingEvent ? 'Edit Event' : 'New Live Event'}</h3>
                <button onClick={cancelEdit} className="p-2 rounded-full hover:bg-blush-50 transition-colors"><X className="w-5 h-5 text-mocha" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-espresso mb-1.5 block">Event Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. The Emotional Reset Live Workshop" className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso" />
                </div>
                <div>
                  <label className="text-sm font-medium text-espresso mb-1.5 block">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe what attendees will experience..." rows={4} className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso resize-none" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-espresso mb-1.5 block">Event Date &amp; Time</label>
                    <input type="datetime-local" value={formData.event_date} onChange={(e) => setFormData({ ...formData, event_date: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-espresso mb-1.5 block">End Date &amp; Time (optional)</label>
                    <input type="datetime-local" value={formData.end_date || ''} onChange={(e) => setFormData({ ...formData, end_date: e.target.value || null })} className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-espresso mb-1.5 block">Location</label>
                    <input type="text" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Online via Zoom" className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-espresso mb-1.5 block">Price ($)</label>
                    <input type="number" step="0.01" value={formData.price ?? ''} onChange={(e) => setFormData({ ...formData, price: e.target.value ? parseFloat(e.target.value) : null })} placeholder="49.99" className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-espresso mb-1.5 block">Capacity</label>
                    <input type="number" value={formData.capacity ?? ''} onChange={(e) => setFormData({ ...formData, capacity: e.target.value ? parseInt(e.target.value) : null })} placeholder="50" className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-espresso mb-1.5 block">Image URL (optional)</label>
                  <input type="url" value={formData.image_url || ''} onChange={(e) => setFormData({ ...formData, image_url: e.target.value || null })} placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso" />
                </div>
                <div>
                  <label className="text-sm font-medium text-espresso mb-1.5 block">Registration URL</label>
                  <input type="url" value={formData.registration_url || ''} onChange={(e) => setFormData({ ...formData, registration_url: e.target.value })} placeholder="https://stan.store/sikaflorice" className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })} className="w-5 h-5 rounded accent-blush-500" />
                  <span className="text-sm text-espresso">Publish (visible to visitors)</span>
                </label>
                {error && <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center">{error}</div>}
                <div className="flex gap-3 pt-2">
                  <button onClick={saveEvent} disabled={saving || !formData.title.trim() || !formData.description.trim() || !formData.event_date} className="px-6 py-3 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-soft hover:shadow-premium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2">
                    <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Event'}
                  </button>
                  <button onClick={cancelEdit} className="px-6 py-3 rounded-full glass text-espresso font-semibold hover:scale-105 transition-all duration-300">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {error && !showForm && (
            <div className="max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center">{error}</div>
          )}

          {loading && (
            <div className="flex flex-col items-center gap-4 py-20">
              <div className="w-12 h-12 rounded-full border-4 border-blush-200 border-t-blush-500 animate-spin" />
              <p className="text-mocha text-sm">Loading live events...</p>
            </div>
          )}

          {!loading && !showForm && (
            <>
              {displayEvents.length === 0 ? (
                <div className="text-center py-20">
                  <Video className="w-12 h-12 text-blush-300 mx-auto mb-4" />
                  <p className="font-serif text-2xl text-espresso mb-2">No Upcoming Live Events</p>
                  <p className="text-mocha text-sm">
                    New live sessions are being planned. Check back soon or follow on social media for announcements.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {displayEvents.map((ev, i) => (
                    <div key={ev.id} className={`group relative rounded-3xl bg-white shadow-soft hover:shadow-luxe transition-all duration-500 hover:-translate-y-1 overflow-hidden ${inView ? 'reveal-scale-visible' : 'reveal-scale'}`} style={{ transitionDelay: `${0.2 + i * 0.12}s` }}>
                      <div className="relative h-40 overflow-hidden">
                        {ev.image_url ? (
                          <img src={ev.image_url} alt={ev.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blush-400 via-plum-500 to-blush-600 flex items-center justify-center">
                            <Video className="w-12 h-12 text-white/80" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
                        {ev.price !== null && ev.price > 0 ? (
                          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass text-sm font-semibold text-espresso">${ev.price}</div>
                        ) : (
                          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass text-sm font-semibold text-blush-600">FREE</div>
                        )}
                        {!ev.is_published && adminUnlocked && (
                          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-mocha/80 text-white text-xs font-semibold">Draft</div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-2xl text-espresso mb-3">{ev.title}</h3>
                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-mocha">
                          <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blush-500" />{formatDate(ev.event_date)}</div>
                          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blush-500" />{formatTime(ev.event_date)}</div>
                          {ev.location && <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blush-500" />{ev.location}</div>}
                          {ev.capacity && <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-blush-500" />{ev.capacity} spots</div>}
                        </div>
                        <p className="text-sm text-mocha leading-relaxed mb-6 line-clamp-3">{ev.description}</p>
                        <div className="flex items-center gap-3">
                          {ev.registration_url && (
                            <a href={ev.registration_url} target="_blank" rel="noopener noreferrer" className="flex-1 px-5 py-3 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white text-sm font-semibold text-center shadow-soft hover:shadow-premium hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                              Register Now <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {adminUnlocked && (
                            <>
                              <button onClick={() => startEdit(ev)} className="p-3 rounded-full glass text-espresso hover:bg-blush-50 transition-colors" aria-label="Edit"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(ev.id)} className="p-3 rounded-full glass text-rose-600 hover:bg-rose-50 transition-colors" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {!loading && !adminUnlocked && (
            <div className={`text-center mt-12 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 text-sm text-mocha">
                <Sparkles className="w-4 h-4 text-blush-500" />
                New live sessions are added regularly. Stay connected for updates.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
