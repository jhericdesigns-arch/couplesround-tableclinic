import { useInView } from '@/hooks/useInView';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Jessica Houston',
    role: 'Married 12 years',
    text: 'I was on the verge of giving up. I felt invisible in my own home. Working with Coach Sika helped me find my voice again and rebuild the emotional connection with my husband. Today, we are closer than we have been in years.',
    rating: 5,
  },
  {
    name: 'Tanya Williams',
    role: 'Married 8 years',
    text: 'I did not realize how much I was carrying alone. The Heart & Home Reset gave me the tools to stop spiraling and start leading emotionally. My husband noticed the change within weeks. This saved my marriage.',
    rating: 5,
  },
  {
    name: 'Michaela Brooks',
    role: 'Married 15 years',
    text: 'Coach Sika sees you. Really sees you. She does not judge. She guides. The Emotional Leadership Intensive was the deepest, most transformative work I have ever done. I finally feel at peace — not because my marriage is perfect, but because I am.',
    rating: 5,
  },
  {
    name: 'Rebecca Daniels',
    role: 'Married 6 years',
    text: 'The Become Emotionally Anchored guide was the first thing that actually helped me understand what was happening inside me. I stopped crying in silence. I stopped shrinking. I started showing up differently — and everything changed.',
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { ref: cardsRef, inView: cardsIn } = useInView<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blush-100/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-plum-100/40 blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-sm tracking-[0.2em] uppercase text-blush-500 font-semibold">
            Stories of Transformation
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-espresso mt-4 mb-6 leading-tight">
            Wives Who Found
            <span className="text-gradient-blush"> Their Way Back</span>
          </h2>
          <p className="text-lg text-mocha leading-relaxed">
            Real women. Real marriages. Real healing. These are the voices of wives
            who were once where you might be right now.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`relative p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-blush-100 shadow-soft hover:shadow-premium transition-all duration-700 ${
                cardsIn ? (i % 2 === 0 ? 'reveal-left-visible' : 'reveal-right-visible') : (i % 2 === 0 ? 'reveal-left' : 'reveal-right')
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <Quote className="w-10 h-10 text-blush-200 mb-4" fill="currentColor" />

              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, ri) => (
                  <Star key={ri} className="w-4 h-4 text-champagne-400" fill="currentColor" />
                ))}
              </div>

              <p className="text-mocha leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-300 to-plum-400 flex items-center justify-center">
                  <span className="font-serif text-lg text-white">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-serif text-lg text-espresso">{t.name}</p>
                  <p className="text-xs text-mocha">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
