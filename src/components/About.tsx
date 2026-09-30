import { useInView } from '@/hooks/useInView';
import { Heart, Shield, Sparkles, Compass, Quote } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { ref: ref2, inView: inView2 } = useInView<HTMLDivElement>();

  const values = [
    { icon: Heart, title: 'Compassionate', desc: 'A heart-centered approach that meets you exactly where you are.' },
    { icon: Shield, title: 'Safe Space', desc: 'A judgment-free zone where your pain is honored and your voice is heard.' },
    { icon: Sparkles, title: 'Solution-Focused', desc: 'Practical tools, proven strategies, and honest conversations.' },
    { icon: Compass, title: 'Real Transformation', desc: 'Not just coaching — a journey back to love, from the inside out.' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blush-100/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-plum-100/40 blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Image side: dual founder images with layered reveal ── */}
          <div className={`relative ${inView ? 'animate-reveal-up' : 'reveal-hidden'}`}>
            {/* Main portrait */}
            <div className="relative rounded-3xl overflow-hidden shadow-luxe">
              <img
                src="/images/founders/Founder.jpg"
                alt="Coach Sika Florice"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent" />
            </div>

            {/* Secondary image — offset, smaller, behind */}
            <div
              className={`absolute -bottom-10 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-premium border-4 border-cream ${
                inView ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              <img
                src="/images/founders/Founder_2.jpg"
                alt="Coach Sika Florice in session"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating quote card */}
            <div
              className={`absolute -top-6 -left-6 glass rounded-2xl shadow-premium p-5 max-w-[260px] ${
                inView ? 'animate-slide-right' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.4s' }}
            >
              <Quote className="w-5 h-5 text-blush-300 mb-2" fill="currentColor" />
              <p className="text-sm text-mocha leading-relaxed italic">
                "You can still love your husband. You can still hope for your marriage. But you don't have to disappear inside it while waiting for things to change. Your peace can begin with you."
              </p>
              <p className="text-xs text-espresso font-semibold mt-2">— Coach Sika Florice</p>
            </div>

            {/* Decorative gradient ring */}
            <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-br from-blush-300 to-plum-400 opacity-20 blur-2xl" />
          </div>

          {/* ── Content side ── */}
          <div className={inView ? 'animate-reveal-up' : 'reveal-hidden'} style={{ animationDelay: '0.2s' }}>
            <span className="text-sm tracking-[0.2em] uppercase text-blush-500 font-semibold">
              About Me
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-espresso mt-4 mb-6 leading-tight">
              I'm Coach Sika Florice,
              <br />
              <span className="text-gradient-blush">helping you stop losing yourself while trying to save your marriage.</span>
            </h2>
            <div className="space-y-4 text-mocha leading-relaxed mb-8">
              <p>
                Couples Round-Table Clinic, led by Coach Sika Florice, helps 
                emotionally lonely wives who feel unseen, unheard, disconnected,
                abandoned, cheated on unappreciated in their marriage regain their peace, confidence, and emotional stability.
              </p>
              <p>
                Many of our clients are women who love their husbands but feel alone,
                exhausted, and overwhelmed from carrying the emotional weight of the relationship by themselves.
                Through practical coaching, emotional support, faith-based guidance, and proven relationship
                strategies, we help women rebuild emotional safety, establish 
                healthy boundaries, stop losing themselves in the process, and 
                find clarity, strength and peace, regardless of what their spouse chooses to do.
              </p>
            </div>

            <div ref={ref2} className="grid grid-cols-2 gap-4 mb-8">
              {values.map((val, i) => (
                <div
                  key={val.title}
                  className={`p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-blush-100 transition-all duration-700 ${
                    inView2
                      ? 'reveal-scale-visible opacity-100'
                      : 'reveal-scale opacity-0'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <val.icon className="w-6 h-6 text-blush-500 mb-2" />
                  <h4 className="font-serif text-lg text-espresso mb-1">{val.title}</h4>
                  <p className="text-xs text-mocha leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('specialization')}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-premium hover:shadow-luxe hover:scale-105 transition-all duration-300"
            >
              Explore My Specialization
            </button>
          </div>
        </div>

        <div className={`mt-20 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center rounded-3xl overflow-hidden bg-gradient-to-br from-blush-50 to-plum-50 border border-blush-100 shadow-soft ${inView ? 'animate-reveal-up' : 'reveal-hidden'}`} style={{ animationDelay: '0.45s' }}>
          <div className="p-8 md:p-12">
            <span className="text-xs tracking-[0.2em] uppercase text-blush-500 font-semibold">The Work We Do</span>
            <h3 className="font-serif text-3xl md:text-4xl text-espresso mt-3 mb-4 leading-tight">
              You can care about your marriage without losing yourself in it.
            </h3>
            <p className="text-mocha leading-relaxed">
              This is a place for women who feel alone inside their relationship — a place
              to be seen, heard, and supported as they find their way back to emotional
              strength and a healthier connection.
            </p>
          </div>
          <div className="h-full min-h-[280px]">
            <img
              src="/images/IMG-20260728-WA0048.jpg"
              alt="A couple sharing a warm moment together"
              className="w-full h-full min-h-[280px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
