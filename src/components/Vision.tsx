import { useInView } from '@/hooks/useInView';
import { Eye, Heart, Users, Sparkles, Home, ArrowRight } from 'lucide-react';

interface VisionProps {
  onNavigate?: (page: string) => void;
}

export default function Vision({ onNavigate }: VisionProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { ref: ref2, inView: inView2 } = useInView<HTMLDivElement>();
  const { ref: ref3, inView: inView3 } = useInView<HTMLDivElement>();

  const pillars = [
    {
      icon: Heart,
      title: 'Stronger Individuals',
      desc: 'Helping people rebuild emotional strength, regain clarity, and reconnect with themselves.',
    },
    {
      icon: Users,
      title: 'Healthier Marriages',
      desc: 'Equipping couples with the tools, education, and support to navigate the real challenges of married life.',
    },
    {
      icon: Home,
      title: 'Stronger Families',
      desc: 'Building a foundation where healthier marriages create strong, stable, and thriving families.',
    },
  ];

  const futureAreas = [
    'Communication breakdowns',
    'Recurring conflict',
    'Emotional disconnection',
    'Intimacy challenges',
    'Betrayal & trust rebuilding',
    'Other complexities of marriage',
  ];

  return (
    <section id="vision" className="py-24 md:py-32 bg-mesh relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blush-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-plum-200/40 blur-3xl" />

      {/* ── Header ── */}
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center mb-20">
        <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass shadow-soft mb-6 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
          <Eye className="w-4 h-4 text-blush-500" />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-blush-500">Our Vision</span>
        </div>
        <h2 className={`font-serif text-4xl md:text-6xl text-espresso leading-tight mb-6 ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
          The Vision Behind
          <br />
          <span className="text-gradient-blush">Couples Round-Table Clinic</span>
        </h2>
        <p className={`text-xl md:text-2xl font-serif italic text-mocha leading-relaxed ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          Building Stronger Individuals. Healthier Marriages. Stronger Families.
        </p>
      </div>

      {/* ── Founding purpose ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-20">
        <div className={`glass rounded-3xl shadow-premium p-8 md:p-12 transition-all duration-1000 ${inView ? 'reveal-visible' : 'reveal-hidden'}`}>
          <p className="text-lg text-mocha leading-relaxed mb-6">
            Couples Round-Table Clinic was founded with a vision that reaches beyond
            solving one marriage problem. It's being built to become a trusted destination
            where individuals and couples can find compassionate guidance, practical tools,
            education, and specialized support for the real challenges that arise throughout
            married life.
          </p>
          <p className="text-lg text-mocha leading-relaxed">
            Our vision is to create a place where people do not have to navigate the most
            difficult seasons of marriage feeling confused, unsupported, or unsure of what
            to do next.
          </p>
        </div>
      </div>

      {/* ── Three pillars ── */}
      <div ref={ref2} className="relative z-10 max-w-6xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`group relative p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-blush-100 shadow-soft hover:shadow-premium transition-all duration-700 hover:-translate-y-2 ${
                inView2 ? 'reveal-scale-visible' : 'reveal-scale'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blush-400 to-plum-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <pillar.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-serif text-xl text-espresso mb-3">{pillar.title}</h3>
              <p className="text-sm text-mocha leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Today: emotionally lonely wives ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-20">
        <div className={`grid md:grid-cols-[1fr_1.3fr] gap-8 items-center rounded-3xl overflow-hidden bg-white/70 backdrop-blur-sm border border-blush-100 shadow-soft ${inView2 ? 'animate-reveal-up' : 'reveal-hidden'}`} style={{ animationDelay: '0.4s' }}>
          <div className="relative min-h-[280px]">
            <img
              src="/images/IMG-20260728-WA0044.jpg"
              alt="A woman reconnecting with her inner strength"
              className="w-full h-full min-h-[280px] object-cover"
            />
          </div>
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blush-400 to-blush-600 flex items-center justify-center flex-shrink-0 shadow-soft">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-xs tracking-[0.2em] uppercase text-blush-500 font-semibold">Where We Begin</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-espresso mb-4 leading-tight">
              Today, that vision begins with emotionally lonely wives.
            </h3>
            <p className="text-mocha leading-relaxed mb-4">
              Women who still value their marriage and desire for it to work, yet feel
              unseen, unheard, emotionally disconnected, betrayed, or exhausted from
              carrying the emotional weight of their relationship.
            </p>
            <p className="text-mocha leading-relaxed">
              Through Coach Sika Florice's work, we help these women rebuild emotional
              strength, regain clarity and inner stability, reconnect with themselves, and
              learn healthier ways to navigate their marriage without disappearing inside it.
            </p>
          </div>
        </div>
      </div>

      {/* ── The bigger vision ── */}
      <div ref={ref3} className="relative z-10 max-w-4xl mx-auto px-6 mb-20">
        <div className={`rounded-3xl bg-gradient-to-br from-espresso to-[#1a2742] p-8 md:p-12 shadow-luxe ${inView3 ? 'reveal-visible' : 'reveal-hidden'}`}>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-blush-300" />
            <span className="text-sm tracking-[0.2em] uppercase text-blush-300 font-semibold">But The Vision Is Bigger</span>
          </div>
          <p className="text-white/90 leading-relaxed mb-6">
            As Couples Round-Table Clinic grows, our vision is to bring together skilled
            marriage professionals and coaches with specialized areas of expertise — creating
            a comprehensive place of support for individuals and couples navigating the
            complexities of marriage.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {futureAreas.map((area, i) => (
              <div
                key={area}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-700 ${
                  inView3 ? 'reveal-left-visible' : 'reveal-left'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blush-400 to-plum-400 flex-shrink-0" />
                <span className="text-sm text-white/80">{area}</span>
              </div>
            ))}
          </div>
          <p className="text-white/90 leading-relaxed">
            We envision a future where Couples Round-Table Clinic serves marriages beyond
            individual coaching — through specialized programs, education, workshops,
            conferences, community initiatives, and resources designed to strengthen
            relationships and families.
          </p>
        </div>
      </div>

      {/* ── Closing conviction ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className={`text-center ${inView3 ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-blush-50 to-plum-50 border border-blush-200">
            <p className="font-serif text-2xl md:text-3xl text-espresso leading-snug">
              "Strong marriages are built by emotionally healthy,
              <br className="hidden md:block" />
              <span className="text-gradient-blush"> equipped, and intentional people.</span>"
            </p>
            <div className="w-12 h-px bg-gradient-to-r from-blush-400 to-plum-400" />
            <p className="text-mocha text-sm max-w-xl leading-relaxed">
              We are beginning with one specialized area of need, but we are building toward
              something greater: a trusted home for marriage support. A place for growth,
              restoration, and stronger connection — where healthier individuals build
              healthier marriages, and healthier marriages help create strong families.
            </p>
            <p className="font-serif text-lg text-espresso italic mt-2">
              This is the vision of Couples Round-Table Clinic.
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('contact')}
                className="group mt-4 px-7 py-3.5 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-premium hover:shadow-luxe hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Join the Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
