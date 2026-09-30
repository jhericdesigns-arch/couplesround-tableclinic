import { useEffect, useState, useRef } from 'react';
import { X, Heart, Sparkles, ArrowRight } from 'lucide-react';

const RECUR_INTERVAL_MS = 30_000;

export default function HeardSeenWidget() {
  const [visible, setVisible] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollTop / docHeight >= 0.5) {
        setScrollTriggered(true);
        window.removeEventListener('scroll', handleScroll);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollTriggered && !dismissed) {
      setVisible(true);
    }
  }, [scrollTriggered, dismissed]);

  useEffect(() => {
    if (dismissed && scrollTriggered) {
      timerRef.current = setTimeout(() => {
        setDismissed(false);
      }, RECUR_INTERVAL_MS);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [dismissed, scrollTriggered]);

  function handleClose() {
    setVisible(false);
    setDismissed(true);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] max-w-xs animate-slide-in-right">
      <div className="relative rounded-2xl bg-cream shadow-luxe overflow-hidden border border-blush-100">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-blush-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-espresso" />
        </button>

        <div className="relative h-20 bg-gradient-to-br from-blush-500 via-plum-500 to-blush-600 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-white/30 blur-2xl animate-float" />
            <div className="absolute bottom-0 right-0 w-16 h-16 rounded-full bg-white/20 blur-xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <div className="relative z-10 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blush-500" />
            <span className="text-[10px] tracking-[0.18em] uppercase text-blush-500 font-semibold">A Private Conversation</span>
          </div>

          <h3 className="font-serif text-lg text-espresso mb-2 leading-snug">
            You Don't Have To Keep Carrying This Alone
          </h3>

          <p className="text-mocha text-xs leading-relaxed mb-4">
            The Heard &amp; Seen Experience is a private 45-minute conversation where you can
            finally express what has been weighing on you, uncover the emotional patterns
            keeping you stuck, and gain clarity about your next step — without judgement,
            pressure, or generic marriage advice.
          </p>

          <a
            href="https://v2.stan.store/Sikaflorice/p/the-heard--seen-experience"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full py-3 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white text-sm font-semibold shadow-soft hover:shadow-premium hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
          >
            Book Your Session
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            type="button"
            onClick={handleClose}
            className="w-full mt-2 py-1.5 text-xs text-mocha hover:text-blush-600 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
