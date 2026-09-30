import { Heart, Mail, Phone, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-mesh-dark text-white pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blush-400/40 shadow-soft">
                <img
                  src="/images/logo/Couples_Round-Table_Clinic_Logo.jpg"
                  alt="Couples Round-Table Clinic logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-white">Couples Round-Table</h3>
                <p className="text-xs tracking-[0.22em] uppercase text-blush-300">
                  Clinic
                </p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
              Certified Relationship and Marriage Coaching helping couples rebuild
              trust, communicate openly, and restore emotional connection — so they
              stop surviving and start thriving together.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/14029063565"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-blush-500 transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/100064140365305"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-blush-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-blush-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-blush-200 mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><button onClick={() => onNavigate('home')} className="hover:text-blush-300 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-blush-300 transition-colors">About Coach Sika</button></li>
              <li><button onClick={() => onNavigate('specialization')} className="hover:text-blush-300 transition-colors">Specialization</button></li>
              <li><button onClick={() => onNavigate('store')} className="hover:text-blush-300 transition-colors">Store</button></li>
              <li><button onClick={() => onNavigate('events')} className="hover:text-blush-300 transition-colors">Live Events</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-blush-200 mb-5">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blush-300" />
                <a href="mailto:coachsika@couplesround-table.com" className="hover:text-blush-300 transition-colors">
                  coachsikaflorice@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blush-300" />
                <a href="https://wa.me/14029063565" target="_blank" rel="noopener noreferrer" className="hover:text-blush-300 transition-colors">
                  +1 (402) 906-3565
                </a>
              </li>
              <li>
                <a
                  href="https://stan.store/sikaflorice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white text-sm font-semibold hover:scale-105 transition-transform duration-300"
                >
                  Visit My Stan Store
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} Couples Round-Table Clinic. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-2">
  Developed by{' '}
  <a
    href="https://jhericdesigns.vercel.app"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blush-300 hover:text-blush-200 transition-colors duration-300"
  >
    Jheric Designs
  </a>
</p>
          <p className="text-white/50 text-xs">
            Helping couples reconnect, rebuild, and love again.
          </p>
        </div>
      </div>
    </footer>
  );
}
