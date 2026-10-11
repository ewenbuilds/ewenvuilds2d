import React, { useState } from 'react';
import { trackEvent, trackOutboundLink } from '../utils/analytics';
import { Send, Github, Linkedin, Mail, Globe, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formMode, setFormMode] = useState<'formspree' | 'cloudflare_function'>('formspree');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    trackEvent('contact_form_submit', {
      category: 'contact',
      action: 'submit_attempt',
      label: formMode,
    });

    if (formMode === 'cloudflare_function') {
      e.preventDefault();
      setSubmissionStatus('submitting');
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setSubmissionStatus('success');
          setStatusMessage('Message sent successfully via Cloudflare Pages Function!');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          setSubmissionStatus('error');
          setStatusMessage(data.error || 'Failed to submit via Cloudflare Pages Function. Check environment variables.');
        }
      } catch (err) {
        setSubmissionStatus('error');
        setStatusMessage('Error connecting to /api/contact. Ensure Cloudflare Pages Functions is active.');
      }
    } else {
      // In Formspree mode, if the URL is still the placeholder, intercept and alert gracefully
      const formElement = e.currentTarget;
      if (formElement.action.includes('[INSERT FORMSPREE ENDPOINT URL]')) {
        e.preventDefault();
        setSubmissionStatus('error');
        setStatusMessage('Placeholder Notice: Replace [INSERT FORMSPREE ENDPOINT URL] with your Formspree endpoint (e.g., https://formspree.io/f/xyz123) in src/components/ContactSection.tsx.');
      }
    }
  };

  const socialLinks = [
    {
      platform: 'GitHub',
      label: '[INSERT GITHUB URL]',
      href: 'https://github.com/[INSERT GITHUB USERNAME]',
      icon: Github,
    },
    {
      platform: 'LinkedIn',
      label: '[INSERT LINKEDIN URL]',
      href: 'https://linkedin.com/in/[INSERT LINKEDIN USERNAME]',
      icon: Linkedin,
    },
    {
      platform: 'Email',
      label: '[INSERT DIRECT EMAIL ADDRESS]',
      href: 'mailto:[INSERT DIRECT EMAIL ADDRESS]',
      icon: Mail,
    },
    {
      platform: 'CAD & 3D Repositories',
      label: '[INSERT MAKERWORLD / PRINTABLES URL]',
      href: 'https://[INSERT CAD PLATFORM URL]',
      icon: Globe,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>SECTION 05</span>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <span>COMMUNICATION &amp; NETWORK</span>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Initiate Contact &amp; Inquiries
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Available for engineering consultations, open-source hardware collaborations, and academic research inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Form Mode Selector (Demonstrating static Formspree vs Cloudflare Pages Function) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-slate-400">
                DISPATCH PIPELINE:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono">
                <button
                  type="button"
                  onClick={() => {
                    setFormMode('formspree');
                    setSubmissionStatus('idle');
                  }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    formMode === 'formspree' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Formspree (Static)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormMode('cloudflare_function');
                    setSubmissionStatus('idle');
                  }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    formMode === 'cloudflare_function' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Cloudflare Function (/api/contact)
                </button>
              </div>
            </div>

            {/* Static Action Form */}
            {/* CRITICAL: action set to [INSERT FORMSPREE ENDPOINT URL] with method="POST" */}
            <form
              action="[INSERT FORMSPREE ENDPOINT URL]"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-mono text-slate-300">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="[INSERT YOUR FULL NAME]"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono text-slate-300">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="[INSERT YOUR EMAIL ADDRESS]"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-xs font-mono text-slate-300">
                  Subject / Project Scope
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="[INSERT INQUIRY TOPIC / HARDWARE PROJECT]"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-mono text-slate-300">
                  Message Details <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="[INSERT PROJECT DETAILS, COLLABORATION SCOPE, OR QUESTIONS]"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-colors resize-none"
                />
              </div>

              {/* Status Message Alert */}
              {submissionStatus === 'error' && (
                <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-lg flex items-start gap-2.5 text-xs font-mono text-rose-300">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}
              {submissionStatus === 'success' && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-lg flex items-start gap-2.5 text-xs font-mono text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submissionStatus === 'submitting'}
                className="w-full py-3 px-4 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm shadow-cyan-500/20"
              >
                <Send className="w-4 h-4" />
                <span>
                  {submissionStatus === 'submitting'
                    ? 'Transmitting...'
                    : formMode === 'formspree'
                    ? 'Send Message (via Formspree)'
                    : 'Dispatch (via Cloudflare Edge Function)'}
                </span>
              </button>

              <div className="text-[11px] font-mono text-slate-500 text-center pt-1">
                Zero tracking cookies · Privacy-first static dispatch
              </div>
            </form>
          </div>

          {/* Right Column: Professional Links & Direct Reach */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Direct Channels &amp; Repositories
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Source code, engineering releases, and academic links are maintained across verified open profiles:
              </p>

              <div className="space-y-3 pt-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.platform}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackOutboundLink(item.platform, item.href)}
                      className="p-3.5 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 rounded-xl transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 text-cyan-400 rounded-lg group-hover:bg-cyan-950 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">{item.platform}</div>
                          <div className="text-[11px] font-mono text-slate-400">{item.label}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Engineering Office Hours Note */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2 text-xs font-mono text-slate-400">
              <span className="text-cyan-400 font-semibold block uppercase">
                Location &amp; Timezone
              </span>
              <p>[INSERT LAB / STUDIO LOCATION: E.G., SAN FRANCISCO, CA · UTC-8]</p>
              <p className="text-slate-500">
                Typical reply turnaround: [INSERT ESTIMATED RESPONSE TIME: 24–48 HOURS]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
