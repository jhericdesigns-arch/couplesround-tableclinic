import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Specialization from '@/components/Specialization';
import Vision from '@/components/Vision';
import Store from '@/components/Store';
import LiveEvents from '@/components/LiveEvents';
import LiveEventsPreview from '@/components/LiveEventsPreview';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import PDFDownloadPopup from '@/components/popups/PDFDownloadPopup';
import HeardSeenWidget from '@/components/popups/HeardSeenWidget';

function App() {
  const [page, setPage] = useState('home');

  const handleNavigate = (target: string) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Read hash on initial load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) setPage(hash);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'about':
        return (
          <>
            <div className="pt-20" />
            <About onNavigate={handleNavigate} />
            <Vision onNavigate={handleNavigate} />
            <Specialization />
          </>
        );
      case 'specialization':
        return (
          <>
            <div className="pt-20" />
            <Specialization />
          </>
        );
      case 'store':
        return (
          <>
            <div className="pt-20" />
            <Store />
            <Testimonials />
          </>
        );
      case 'events':
        return (
          <>
            <div className="pt-20" />
            <LiveEvents />
          </>
        );
      case 'contact':
        return (
          <>
            <div className="pt-20" />
            <Contact onNavigate={handleNavigate} />
          </>
        );
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <About onNavigate={handleNavigate} />
            <Vision onNavigate={handleNavigate} />
            <Specialization />
            <Store />
            <LiveEventsPreview onNavigate={handleNavigate} />
            <Testimonials />
            <Contact onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar currentPage={page} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <PDFDownloadPopup />
      <HeardSeenWidget />
    </div>
  );
}

export default App;
