export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  priceLabel: string;
  category: 'guide' | 'coaching' | 'physical';
  image: string;
  features: string[];
  buttonText: string;
  stanStoreUrl: string;
  badge?: string;
}

const STAN_STORE_BASE = 'https://stan.store/sikaflorice';

export const products: Product[] = [
  {
    id: 'not-crazy-not-needy-just-unheard',
    title: 'Become Emotionally Anchored',
    tagline: 'A Clarity & Emotional Stability Guide for Wives Who Feel Lonely in Their Marriage',
    description:
      'You are not overreacting. You are not crazy. You are just unheard. This guide helps you stop spiraling, stop shrinking, and stop crying in silence — and start rebuilding your emotional stability today.',
    price: 47,
    priceLabel: '$47',
    category: 'guide',
    image:
      'https://images.pexels.com/photos/6957145/pexels-photo-6957145.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Clarity exercises to identify root emotional patterns',
      'Emotional regulation techniques for daily use',
      'Self-leadership frameworks for wives',
      'Downloadable workbook included',
    ],
    buttonText: 'Become Emotionally Anchored',
    stanStoreUrl: `${STAN_STORE_BASE}/p/not-crazy-not-needy-just-unheard`,
    badge: 'Bestseller',
  },
  {
    id: 'the-heard--seen-experience',
    title: 'The Heard & Seen Experience',
    tagline: 'A safe space where your pain is honored, your voice is heard, and your next steps are cleared',
    description:
      'Feeling alone in your marriage? You are not crazy. You are just unheard. This experience gives you a safe, guided space to process your emotional pain and turn it into powerful clarity.',
    price: 49.99,
    priceLabel: '$49.99',
    category: 'coaching',
    image:
      'https://images.pexels.com/photos/6759384/pexels-photo-6759384.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Private guided emotional clarity session',
      'Personalized next-step roadmap',
      'Safe, confidential, and compassionate space',
      'Practical tools to feel seen and heard again',
    ],
    buttonText: 'Access My Anchor Guide',
    stanStoreUrl: `${STAN_STORE_BASE}/p/the-heard--seen-experience`,
  },
  {
    id: 'the-heart--home-reset',
    title: 'The Heart & Home Reset',
    tagline: 'For wives seeking peace, emotional safety, and connection without walking away',
    description:
      'Three private coaching sessions designed to help you stop feeling lost, invisible, or stuck. This is your first step toward reclaiming peace and emotional safety inside your marriage.',
    price: 397,
    priceLabel: '$397',
    category: 'coaching',
    image:
      'https://images.pexels.com/photos/6957139/pexels-photo-6957139.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      '3 private 1-on-1 coaching sessions',
      'Personalized emotional safety roadmap',
      'Conflict resolution strategies',
      'Reconnection tools for you and your partner',
    ],
    buttonText: 'Book The Heart & Home Reset',
    stanStoreUrl: `${STAN_STORE_BASE}/p/the-heart--home-reset`,
    badge: 'Most Popular',
  },
  {
    id: 'the-emotional-leadership-intensive',
    title: 'The Emotional Leadership Intensive',
    tagline: 'For wives feeling emotionally alone in marriage and ready to reclaim peace together',
    description:
      'A deep, focused, and intentional intensive for wives ready to step into emotional leadership. Personalized attention, thoughtful preparation, and real transformation — not rushed calls.',
    price: 997,
    priceLabel: '$997',
    category: 'coaching',
    image:
      'https://images.pexels.com/photos/6957176/pexels-photo-6957176.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Deep-dive intensive coaching program',
      'Personalized attention with limited enrollment',
      'Emotional leadership and self-mastery frameworks',
      'Ongoing support between sessions',
    ],
    buttonText: 'Claim Your Breakthrough',
    stanStoreUrl: `${STAN_STORE_BASE}/p/the-emotional-leadership-intensive`,
    badge: 'Premium',
  },
  {
    id: 'the-love-collection',
    title: 'The Love Collection',
    tagline: 'Relationship candles designed to help you slow down, reconnect, and communicate with more peace',
    description:
      'Turn heated moments into healing conversations. These relationship candles were created to help couples slow down, reconnect, and bring softness back into their communication.',
    price: 59.99,
    priceLabel: '$59.99',
    category: 'physical',
    image:
      'https://images.pexels.com/photos/6957136/pexels-photo-6957136.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Hand-poured relationship candles',
      'Designed for intentional reconnection',
      'Bring softness back to conversations',
      'Perfect for couples date nights',
    ],
    buttonText: 'Order Your Love Language Today',
    stanStoreUrl: `${STAN_STORE_BASE}/p/the-love-collection`,
  },
  {
    id: 'couples-roundtable-clinic-luxury-candle',
    title: 'Couples Round-Table Clinic Luxury Candle',
    tagline: 'Luxury candles created for couples who still love each other',
    description:
      'Light the candle. Lower the tension. Reconnect intentionally. Choose love again. This luxury candle was made for couples whose conversations always turn into arguments.',
    price: 97,
    priceLabel: '$97',
    category: 'physical',
    image:
      'https://images.pexels.com/photos/6957133/pexels-photo-6957133.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Luxury hand-poured candle',
      'Turn hard conversations into healing moments',
      'Intentional reconnection ritual',
      'Emotional peace and grace for couples',
    ],
    buttonText: 'Order Your Luxury Candle Today',
    stanStoreUrl: `${STAN_STORE_BASE}/p/couples-roundtable-clinic-luxury-candle`,
  },
  {
    id: 'premium-reconnection-experience-box',
    title: 'Premium Reconnection Experience Box',
    tagline: 'An upgraded luxury box for couples ready to reconnect emotionally and communicate deeply',
    description:
      'This upgraded luxury box was created for couples who are ready to reconnect emotionally, communicate with intention, and rediscover the love that brought them together.',
    price: 197,
    priceLabel: '$197',
    category: 'physical',
    image:
      'https://images.pexels.com/photos/6957142/pexels-photo-6957142.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Premium luxury reconnection box',
      'Curated tools for emotional reconnection',
      'Intentional communication guides',
      'The ultimate couples reset experience',
    ],
    buttonText: 'Order Now',
    stanStoreUrl: `${STAN_STORE_BASE}/p/premium-reconnection-experience-box`,
    badge: 'Luxury',
  },
];

export const stanStoreUrl = STAN_STORE_BASE;
