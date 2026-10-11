import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface FooterProps {
  onOpenAdminInfo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminInfo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('navigation_click', {
      category: 'navigation',
      action: 'scroll_to_top',
    });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <div className="text-base font-bold text-white font-sans tracking-tight flex items-center gap-2">
              <span className="font-mono text-cyan-400">&lt;/&gt;</span>
              <span>EWENBUILDS<span className="text-cyan-400">.xyz</span></span>
            </div>
            <p className="text-slate-500 mt-1">
              [INSERT PORTFOLIO TAGLINE: Open-Source Engineering, Precision Hardware &amp; Mechatronics]
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <a href="#overview" className="hover:text-cyan-400 transition-colors">Overview</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#build-guides" className="hover:text-cyan-400 transition-colors">Build Guides &amp; 3D</a>
            <a href="#resume" className="hover:text-cyan-400 transition-colors">Resume</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            <button
              type="button"
              onClick={onOpenAdminInfo}
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin / Analytics</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} EWENBUILDS.xyz · Released under [INSERT LICENSE: CERN OHL-S / MIT]
          </div>

          <div className="flex items-center gap-4">
            <span>Deployed on Cloudflare Pages</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
