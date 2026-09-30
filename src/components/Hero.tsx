import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallaxOffset = scrollY * 0.35;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Parallax Banner Image ── */}
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <div
          className="absolute inset-[-10%] bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url('/images/IMG-20260728-WA0047.jpg')`,
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />
        {/* Base dark scrim for guaranteed readability over any photo */}
        <div className="absolute inset-0 bg-espresso/90" />
        {/* Brand color wash — magenta + sky blue from logo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blush-900/85 via-espresso/70 to-plum-900/75" />
        {/* Bottom fade for smooth scroll transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent" />
      </div>

      {/* Floating decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blush-300/15 blur-3xl animate-float z-0" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-plum-300/15 blur-3xl animate-float z-0" style={{ animationDelay: '2s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/25 animate-float"
            style={{
              left: `${(i * 7.3 + 5) % 100}%`,
              top: `${(i * 6.1 + 10) % 100}%`,
              animationDelay: `${(i * 0.4) % 6}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass shadow-soft mb-8 ${
            mounted ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          <Sparkles className="w-4 h-4 text-blush-300" />
          <span className="text-sm font-medium text-white tracking-wide" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            Certified Marriage Coaching For Emotionally Lonely Wives
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6 ${
            mounted ? 'animate-fade-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.15s', textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}
        >
          Still Married, Still Trying
          <br />
          <span
            className="italic"
            style={{
              background: 'linear-gradient(135deg, #fde3f2 0%, #f99dd5 45%, #f565b5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 14px rgba(0,0,0,0.4))',
            }}
          >
            But Tired
          </span>{' '}
          of Feeling Alone?
        </h1>

        {/* Sub-heading */}
        <p
          className={`text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed ${
            mounted ? 'animate-fade-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.3s', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
        >
          You love your husband. You want your marriage to work. But you're exhausted from being the 
          one who keeps trying, explaining, fixing, forgiving, and holding everything together, while 
          your own emotional needs keep getting push aside. 
          <p> </p>
          I help emotionally lonely wives stop losing themselves, trying to save their marriage, rebuild 
          their emotional strength and inner peace, and learn how to move forward with clarity, even 
          when their husband hasn't changed yet.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${
            mounted ? 'animate-fade-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.45s' }}
        >
          <a
            href="https://calendly.com/coachsika777/couples-round-table-clinic-coaching"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-premium hover:shadow-luxe hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            I'm Ready to Find Myself Again
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => onNavigate('about')}
            className="px-8 py-4 rounded-full border border-white/40 text-white font-semibold backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            Meet Coach Sika
          </button>
        </div>

        {/* Social proof */}
        <div
          className={`mt-16 flex items-center justify-center ${
            mounted ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.8s' }}
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="flex -space-x-3">
              {[
                '/images/founders/Founder.jpg',
                null, null, null,
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white/60 overflow-hidden bg-gradient-to-br from-blush-300 to-plum-400 flex items-center justify-center"
                >
                  {src ? (
                    <img src={src} alt="Coach" className="w-full h-full object-cover" />
                  ) : (
                    <Heart className="w-4 h-4 text-white" fill="white" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Countless wives</p>
              <p className="text-xs text-white/70">guided back to peace</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-fade-in"
        style={{ animationDelay: '1.2s' }}
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-blush-300 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
