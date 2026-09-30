import { useInView } from '@/hooks/useInView';
import { products, stanStoreUrl, type Product } from '@/data/products';
import { ExternalLink, Check, Sparkles, ShoppingBag } from 'lucide-react';

const categoryLabels: Record<Product['category'], string> = {
  guide: 'Digital Guide',
  coaching: 'Coaching Program',
  physical: 'Physical Product',
};

const categoryColors: Record<Product['category'], string> = {
  guide: 'bg-champagne-100 text-champagne-700',
  coaching: 'bg-blush-100 text-blush-700',
  physical: 'bg-plum-100 text-plum-700',
};

export default function Store() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { ref: gridRef, inView: gridIn } = useInView<HTMLDivElement>();

  return (
    <section id="store" className="py-24 md:py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blush-100/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-champagne-100/40 blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-sm tracking-[0.2em] uppercase text-blush-500 font-semibold">
            The Store
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-espresso mt-4 mb-6 leading-tight">
            Resources for Your
            <span className="text-gradient-blush"> Journey</span>
          </h2>
          <p className="text-lg text-mocha leading-relaxed">
            Digital guides, private coaching programs, and curated luxury products —
            each created to help you reclaim your emotional safety and peace.
          </p>
        </div>

        {/* Featured store banner */}
        <div className={`mb-12 ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
          <div className="relative rounded-3xl bg-gradient-to-r from-blush-500 via-plum-500 to-blush-600 p-8 md:p-10 shadow-luxe overflow-hidden">
            <div className="absolute inset-0 animate-shimmer opacity-30" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-sm tracking-wide font-medium">Stan Store</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl mb-2">
                  Browse All Offerings in One Place
                </h3>
                <p className="text-white/80 text-sm max-w-md">
                  Visit my complete Stan Store for secure checkout, instant access,
                  and all available products.
                </p>
              </div>
              <a
                href={stanStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-7 py-4 rounded-full bg-white text-blush-600 font-semibold shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2"
              >
                Visit Full Store
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`group relative flex flex-col rounded-3xl bg-white shadow-soft hover:shadow-luxe transition-all duration-700 hover:-translate-y-2 overflow-hidden ${
                gridIn ? 'reveal-scale-visible' : 'reveal-scale'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 to-transparent" />
                {product.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass text-xs font-semibold text-espresso shadow-soft flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blush-500" />
                    {product.badge}
                  </div>
                )}
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold ${categoryColors[product.category]}`}>
                  {categoryLabels[product.category]}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-serif text-2xl text-espresso mb-2">{product.title}</h3>
                <p className="text-sm text-mocha leading-relaxed mb-4">{product.tagline}</p>

                <ul className="space-y-2 mb-6 flex-1">
                  {product.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-mocha">
                      <Check className="w-4 h-4 text-blush-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-blush-100">
                  <div>
                    <span className="font-serif text-3xl text-espresso">{product.priceLabel}</span>
                  </div>
                  <a
                    href={product.stanStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn px-5 py-3 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white text-sm font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    {product.buttonText.length > 20 ? 'Get Access' : product.buttonText}
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <p className="text-mocha mb-4">
            Can't decide which offering is right for you?
          </p>
          <a
            href={stanStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-espresso font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-all duration-300"
          >
            Explore Everything in My Stan Store
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
