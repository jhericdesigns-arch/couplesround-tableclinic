import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Mail, Heart, CheckCircle, Sparkles, Download } from 'lucide-react';

const STORAGE_KEY = 'sika_pdf_download_popup_seen';
const PDF_URL = '/The_Emotional_Anchor_Method%20copy%202.pdf';

export default function PDFDownloadPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) return;

    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim(), first_name: firstName.trim() || null });

    if (error && error.code !== '23505') {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
      return;
    }

    setStatus('success');
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-espresso/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md rounded-3xl bg-cream shadow-luxe overflow-hidden animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-blush-100 transition-colors"
          aria-label="Close PDF download popup"
        >
          <X className="w-5 h-5 text-espresso" />
        </button>

        <div className="relative h-32 bg-gradient-to-br from-blush-500 via-plum-500 to-blush-600 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/30 blur-2xl animate-float" />
            <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white/20 blur-xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Heart className="w-7 h-7 text-white" fill="white" />
          </div>
        </div>

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blush-400 to-plum-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-2xl text-espresso mb-2">Your guide is ready</h3>
              <p className="text-mocha text-sm leading-relaxed mb-5">
                Thank you for joining us. Download The Emotional Anchor Method and begin
                rebuilding your inner stability, one gentle step at a time.
              </p>
              <a
                href={PDF_URL}
                download="The_Emotional_Anchor_Method.pdf"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-soft hover:shadow-premium hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download The Emotional Anchor Method
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="w-full mt-3 py-2 text-sm text-mocha hover:text-blush-600 transition-colors"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blush-500" />
                <span className="text-xs tracking-[0.2em] uppercase text-blush-500 font-semibold">A Gift For You</span>
              </div>
              <h3 className="font-serif text-2xl text-espresso mb-3 leading-tight">
                Feel emotionally steady again
              </h3>
              <p className="text-mocha text-sm leading-relaxed mb-6">
                Get The Emotional Anchor Method — a practical guide for emotionally lonely wives
                who want clarity, inner stability, and emotional safety.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Your first name (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso text-sm"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso text-sm"
                />
                {status === 'error' && (
                  <p className="text-rose-600 text-xs text-center">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-soft hover:shadow-premium disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {status === 'submitting' ? 'Preparing your guide...' : 'Get My Free Guide'}
                </button>
              </form>
              <p className="text-xs text-mocha/50 text-center mt-4">
                Your guide is free. No spam, only support.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
