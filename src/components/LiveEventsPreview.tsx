import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { supabase } from '@/lib/supabase';
import {
  Calendar, Clock, MapPin, Users, ExternalLink, ArrowRight,
  Video, Sparkles, Radio,
} from 'lucide-react';

interface LiveEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  price: number | null;
  capacity: number | null;
  image_url: string | null;
  registration_url: string | null;
  is_published: boolean;
}

interface LiveEventsPreviewProps {
  onNavigate: (page: string) => void;
}

export default function LiveEventsPreview({ onNavigate }: LiveEventsPreviewProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { ref: headerRef, inView: headerIn } = useInView<HTMLDivElement>();
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('live_events')
        .select('*')
        .eq('is_published', true)
        .order('event_date', { ascending: true })
        .limit(3);
      setEvents((data || []) as LiveEvent[]);
      setLoading(false);
    }
    load();
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formatTime = (d: string) =>
    new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const upcoming = events.filter((e) => new Date(e.event_date) >= new Date());
  const displayEvents = upcoming.length > 0 ? upcoming : events;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-espresso via-mocha to-espresso">
      {/* Decorative orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blush-500/15 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-plum-500/15 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div ref={headerRef} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Glaring header */}
        <div className={`text-center max-w-3xl mx-auto mb-14 ${headerIn ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blush-500/20 border border-blush-400/40 mb-6">
            <Radio className="w-4 h-4 text-blush-300" />
            <span className="text-sm font-semibold text-blush-200 tracking-wide uppercase">Live Events</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            Come Sit With Me
            <br />
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #fde3f2 0%, #f99dd5 50%, #f565b5 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.3))',
              }}
            >
              Live &amp; In Real Time
            </span>
          </h2>
          <p className="text-lg text-white/80 leading-relaxed" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
            You have been carrying it all alone. These live sessions are your space
            to set it down — to breathe, to be seen, and to heal alongside other
            wives who truly understand.
          </p>
        </div>

        {/* Event cards */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-12">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 animate-pulse">
                <div className="h-40 rounded-2xl bg-white/10 mb-4" />
                <div className="h-6 bg-white/10 rounded mb-3" />
                <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
                <div className="h-4 bg-white/10 rounded w-1/2" />
              </div>
            ))
          ) : displayEvents.length === 0 ? (
            <div className="md:col-span-3 text-center py-16">
              <Video className="w-14 h-14 text-blush-300/60 mx-auto mb-4" />
              <p className="font-serif text-2xl text-white/90 mb-2">New Sessions Coming Soon</p>
              <p className="text-white/60 text-sm max-w-md mx-auto">
                Live sessions are being planned. Check back soon or follow on social media for announcements.
              </p>
            </div>
          ) : (
            displayEvents.map((ev, i) => (
              <div
                key={ev.id}
                className={`group rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-blush-400/50 transition-all duration-700 hover:-translate-y-2 overflow-hidden ${
                  inView ? 'reveal-scale-visible' : 'reveal-scale'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Image / gradient header */}
                <div className="relative h-40 overflow-hidden">
                  {ev.image_url ? (
                    <img src={ev.image_url} alt={ev.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blush-500 via-plum-500 to-blush-600 flex items-center justify-center">
                      <Video className="w-12 h-12 text-white/80" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent" />
                  {ev.price !== null && ev.price > 0 ? (
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full glass text-sm font-semibold text-white">${ev.price}</div>
                  ) : (
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full glass text-sm font-semibold text-blush-200">FREE</div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-white mb-3 leading-snug">{ev.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs text-white/70">
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blush-300" />{formatDate(ev.event_date)}</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blush-300" />{formatTime(ev.event_date)}</div>
                    {ev.location && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blush-300" />{ev.location}</div>}
                    {ev.capacity && <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-blush-300" />{ev.capacity} spots</div>}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed mb-5 line-clamp-2">{ev.description}</p>
                  {ev.registration_url && (
                    <a
                      href={ev.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blush-300 hover:text-blush-200 transition-colors"
                    >
                      Register Now <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTA to full events page */}
        {!loading && displayEvents.length > 0 && (
          <div className={`text-center ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            <button
              onClick={() => onNavigate('events')}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-premium hover:shadow-luxe hover:scale-105 transition-all duration-300"
            >
              View All Live Sessions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Always show CTA if no events yet */}
        {!loading && displayEvents.length === 0 && (
          <div className={`text-center ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            <button
              onClick={() => onNavigate('events')}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-premium hover:shadow-luxe hover:scale-105 transition-all duration-300"
            >
              Explore Live Events
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
