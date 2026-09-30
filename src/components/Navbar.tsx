import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'specialization', label: 'Specialization' },
  { id: 'store', label: 'Store' },
  { id: 'events', label: 'Live Events' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blush-400/40 group-hover:ring-blush-500 group-hover:ring-2 transition-all duration-300 shadow-soft group-hover:shadow-premium group-hover:scale-105">
            <img
              src="/images/logo/Couples_Round-Table_Clinic_Logo.jpg"
              alt="Couples Round-Table Clinic logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="font-serif text-lg text-espresso font-semibold tracking-tight">
              Couples Round-Table
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-blush-500 font-semibold">
              Clinic
            </span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                currentPage === link.id
                  ? 'text-blush-600'
                  : 'text-espresso hover:text-blush-500'
              }`}
            >
              {link.label}
              {currentPage === link.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blush-500" />
              )}
            </button>
          ))}
          <button
            onClick={() => handleNav('store')}
            className="ml-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white text-sm font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-all duration-300"
          >
            Work With Us
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-espresso"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass mt-3 mx-4 rounded-2xl shadow-premium overflow-hidden animate-fade-in">
          <div className="flex flex-col p-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-4 py-3 text-left rounded-xl text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-blush-50 text-blush-600'
                    : 'text-espresso hover:bg-blush-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
