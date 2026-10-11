import React, { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';
import { Menu, X, Download, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenAdminInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminInfo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Projects', href: '#projects' },
    { label: 'Build Guides & 3D', href: '#build-guides' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (label: string, href: string) => {
    trackEvent('navigation_click', {
      category: 'navigation',
      action: 'click_nav_link',
      label,
      target: href,
    });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3.5'
          : 'bg-slate-950/50 backdrop-blur-sm border-b border-slate-900 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Universal Top Bar Contract: 3 zones (Brand wordmark, Nav links, 1 Primary Action) */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#overview"
            onClick={() => handleNavClick('Brand', '#overview')}
            className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <span className="font-mono text-cyan-400 font-semibold">&lt;/&gt;</span>
            <span className="tracking-wider">EWENBUILDS<span className="text-cyan-400">.xyz</span></span>
          </a>

          {/* Zone 2: 4-5 concise single-line text nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.label, link.href)}
                className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 relative py-1 hover:underline underline-offset-8 decoration-cyan-400/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenAdminInfo}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-slate-800 hover:border-slate-700 whitespace-nowrap shrink-0"
              title="Cloudflare Analytics & Admin Architecture Info"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin / Analytics</span>
            </button>
            <a
              href="/downloads/[INSERT RESUME FILE].pdf"
              download
              onClick={() => {
                trackEvent('file_download', {
                  category: 'download',
                  action: 'header_resume_download',
                  label: '[INSERT RESUME FILE].pdf',
                });
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm shadow-cyan-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenAdminInfo}
              className="p-1.5 text-slate-400 hover:text-white"
              aria-label="Admin Info"
            >
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 border-t border-slate-800/80 mt-3 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.label, link.href)}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="/downloads/[INSERT RESUME FILE].pdf"
                download
                onClick={() => {
                  trackEvent('file_download', {
                    category: 'download',
                    action: 'mobile_resume_download',
                    label: '[INSERT RESUME FILE].pdf',
                  });
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
