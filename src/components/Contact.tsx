import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { supabase } from '@/lib/supabase';
import { Mail, Phone, Heart, Send, MessageCircle, User, CheckCircle, Loader2 } from 'lucide-react';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { ref: cardsRef, inView: cardsIn } = useInView<HTMLDivElement>();
  const { ref: formRef, inView: formIn } = useInView<HTMLDivElement>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase.from('contact_messages').insert({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim() || null,
      message: message.trim(),
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email me directly.');
      return;
    }
    setStatus('success');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-mesh relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-blush-200/30 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-plum-200/30 blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-sm tracking-[0.2em] uppercase text-blush-500 font-semibold">
            Let's Connect
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-espresso mt-4 mb-6 leading-tight">
            Your Journey Back to
            <span className="text-gradient-blush"> Love Starts Here</span>
          </h2>
          <p className="text-lg text-mocha leading-relaxed">
            You do not have to walk this road alone. Reach out and let's begin
            the work of rebuilding, restoring, and reconnecting.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <a
            href="mailto:coachsika@couplesround-table.com"
            className={`group p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-blush-100 shadow-soft hover:shadow-premium transition-all duration-700 hover:-translate-y-1 text-center ${cardsIn ? 'reveal-scale-visible' : 'reveal-scale'}`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blush-400 to-plum-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-serif text-xl text-espresso mb-2">Email Me</h3>
            <p className="text-sm text-mocha break-all">coachsika@couplesround-table.com</p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/14029063565"
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-blush-100 shadow-soft hover:shadow-premium transition-all duration-700 hover:-translate-y-1 text-center ${cardsIn ? 'reveal-scale-visible' : 'reveal-scale'}`}
            style={{ transitionDelay: '120ms' }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blush-400 to-plum-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-serif text-xl text-espresso mb-2">WhatsApp</h3>
            <p className="text-sm text-mocha">+1 (402) 906-3565</p>
          </a>

          {/* Stan Store */}
          <a
            href="https://stan.store/sikaflorice"
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-blush-100 shadow-soft hover:shadow-premium transition-all duration-700 hover:-translate-y-1 text-center ${cardsIn ? 'reveal-scale-visible' : 'reveal-scale'}`}
            style={{ transitionDelay: '240ms' }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blush-400 to-plum-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
            <h3 className="font-serif text-xl text-espresso mb-2">Browse the Store</h3>
            <p className="text-sm text-mocha">All courses & products</p>
          </a>
        </div>

        {/* ── Contact Form ── */}
        <div ref={formRef} className={`max-w-2xl mx-auto ${formIn ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm border border-blush-100 shadow-premium p-8 md:p-10">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blush-400 to-plum-500 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-serif text-3xl text-espresso mb-3">Message Sent</h3>
                <p className="text-mocha leading-relaxed mb-6 max-w-md mx-auto">
                  Thank you for reaching out. Your message has been received, and
                  I will get back to you as soon as I can. You are not alone in this.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-3 rounded-full glass text-espresso font-semibold hover:scale-105 transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-espresso mb-2">
                    Send a Message
                  </h3>
                  <p className="text-mocha text-sm">
                    Fill out the form below and I will personally get back to you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-espresso mb-1.5 block">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blush-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-espresso mb-1.5 block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blush-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-espresso mb-1.5 block">Subject (optional)</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What would you like to discuss?"
                      className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-espresso mb-1.5 block">Your Message</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share what's on your heart..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-400 text-espresso text-sm resize-none"
                    />
                  </div>
                  {status === 'error' && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center">
                      {errorMsg}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-premium hover:shadow-luxe disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* CTA banner */}
        <div className={`mt-12 ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <div className="relative rounded-3xl bg-gradient-to-br from-espresso to-mocha p-10 md:p-14 text-center overflow-hidden shadow-luxe">
            <div className="absolute inset-0 animate-shimmer opacity-20" />
            <div className="relative z-10">
              <Heart className="w-10 h-10 text-blush-300 mx-auto mb-4" fill="currentColor" />
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Ready to Reclaim Your Peace?
              </h3>
              <p className="text-white/70 max-w-xl mx-auto mb-8">
                Explore the coaching programs, digital guides, and luxury products
                created to support you on this journey.
              </p>
              <button
                onClick={() => onNavigate('store')}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 text-white font-semibold shadow-premium hover:scale-105 transition-all duration-300"
              >
                Explore My Offerings
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
