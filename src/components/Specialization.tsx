import { useInView } from '@/hooks/useInView';
import { useRef } from 'react';
import { Heart, Shield, Brain, Users, Compass, Sparkles, ArrowRight } from 'lucide-react';

export default function Specialization() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const signsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const { ref: signsViewRef, inView: signsIn } = useInView<HTMLDivElement>();
  const { ref: pillarsViewRef, inView: pillarsIn } = useInView<HTMLDivElement>();

  const pillars = [
    {
      icon: Shield,
      title: 'Emotional Safety',
      desc: 'Learn how to feel emotionally steady again, even when your marriage feels uncertain, distant, or difficult. Respond from a grounded place instead of fear, overthinking, or emotional overwhelm.',
    },
    {
      icon: Brain,
      title: 'Clarity & Self-Leadership',
      desc: 'Understand what is happening in your marriage, recognize the patterns keeping you emotionally stuck and learn what is within your control so you can make decisions from clarity instead of fear or desperation',
    },
    {
      icon: Heart,
      title: 'Reconnect With Yourself',
      desc: 'Reconnect with the woman you are beyond the hurt, disappointment, and constant focus on your marriage. Rediscover your voice, needs, confidence, identity, and the parts of yourself you may have quietly put aside.',
    },
    {
      icon: Compass,
      title: 'Inner Peace',
      desc: 'Stop allowing every change in his mood, distance, silence, or behavior to determine how you feel. Learn how to protect your peace while still loving your husband and hoping for your marriage.',
    },
  ];

  const signs = [
    'You feel emotionally alone-even when your husband is right beside you',
    'You keep explaining how you feel, but somehow the conversation ends in an arguement, defensiveness, or silence.',
    'You feel like you are the one constantly trying to fix the marriage, keep the peace, and hold everything together.',
    'You have started keeping your feelings to yourself because you already know how the conversation is going to end.',
    'His distance, silence, mood, or behavior can change your entire emotional state-and you are exhausted from living this way.',
    'You still love your husband and want your marriage-but you also want to feel like yourself, feel happy, and have peace again.',
  ];

  return (
    <section id="specialization" className="py-24 md:py-32 bg-mesh relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-plum-200/30 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-blush-200/40 blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-sm tracking-[0.2em] uppercase text-blush-500 font-semibold">
            My Specialization
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-espresso mt-4 mb-6 leading-tight">
            What We'll Work On Together
          </h2>
          <p className="text-lg text-mocha leading-relaxed">
            You may not be able to control what happens next in your marriage
            but you can change how you navigate it.
            This is your space. This is your reset.
          </p>
        </div>

        {/* Signs section */}
        <div ref={signsViewRef} className="max-w-5xl mx-auto mb-20">
          <div className={`grid md:grid-cols-[1fr_0.85fr] gap-0 rounded-3xl overflow-hidden shadow-premium transition-all duration-1000 ${signsIn ? 'reveal-visible' : 'reveal-hidden'}`}>
            <div className="glass p-8 md:p-12">
              <h3 className="font-serif text-2xl md:text-3xl text-espresso mb-6 text-center">
                Does This Sound Like You?
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {signs.map((sign, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-4 rounded-2xl bg-white/50 transition-all duration-700 ${signsIn ? 'reveal-left-visible' : 'reveal-left'}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Heart className="w-3 h-3 text-blush-500" fill="currentColor" />
                    </div>
                    <p className="text-sm text-mocha leading-relaxed">{sign}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[260px]">
              <img
                src="/images/IMG-20260728-WA0043.jpg"
                alt="A woman finding her emotional strength again"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cream/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div ref={pillarsViewRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`group relative p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-blush-100 shadow-soft hover:shadow-premium transition-all duration-700 hover:-translate-y-2 ${
                pillarsIn ? 'reveal-scale-visible' : 'reveal-scale'
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

        {/* CTA */}
        <div className={`text-center ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-blush-50 to-plum-50 border border-blush-200 max-w-2xl">
            <Sparkles className="w-8 h-8 text-blush-500" />
            <p className="font-serif text-2xl md:text-3xl text-espresso leading-snug">
              "This isn't just coaching. It's transformation."
            </p>
            <p className="text-mocha text-sm max-w-md">
              Let's rebuild, restore, and reconnect. It would be an honor to walk
              alongside you in your journey back to love.
            </p>
            <a
              href="https://calendly.com/coachsika777/couples-round-table-clinic-coaching"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-premium hover:shadow-luxe hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Begin Your Transformation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
