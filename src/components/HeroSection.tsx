import React, { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';
import { ChevronLeft, ChevronRight, Pause, Play, ArrowDown, Box, Cpu, FileText } from 'lucide-react';

interface SlideItem {
  id: number;
  imagePlaceholder: string;
  imageAlt: string;
  caption: string;
  technicalMetadata: string;
}

const slides: SlideItem[] = [
  {
    id: 1,
    imagePlaceholder: '[INSERT HERO IMAGE 1: HIGH-PRECISION PROTOTYPE BENCH ASSEMBLY]',
    imageAlt: '[INSERT ALT TEXT: CLOSEUP OF 3D PRINTED GANTRY AND ENCODER RIG]',
    caption: '[INSERT CAPTION 1: 5-AXIS ROBOTIC MANIPULATOR PHYSICAL BENCH TEST]',
    technicalMetadata: '[INSERT TELEMETRY / DIMENSIONS: 0.05MM REPEATABILITY · BRUSHLESS FOC DRIVE]',
  },
  {
    id: 2,
    imagePlaceholder: '[INSERT HERO IMAGE 2: CAD EXPLODED VIEW / 3D PARAMETRIC ASSEMBLY]',
    imageAlt: '[INSERT ALT TEXT: SOLIDWORKS/ONESHAPE EXPLODED VIEW OF DRIVE GEARBOX]',
    caption: '[INSERT CAPTION 2: CYCLOIDAL REDUCTION GEARBOX WITH INTEGRATED STRAIN GAUGES]',
    technicalMetadata: '[INSERT CAD SPECS: 45:1 RATIO · ZERO BACKLASH · BILLET 6061-T6 + PETG]',
  },
  {
    id: 3,
    imagePlaceholder: '[INSERT HERO IMAGE 3: ELECTRONICS BENCH SETUP & OSCILLOSCOPE LOGGING]',
    imageAlt: '[INSERT ALT TEXT: CUSTOM PCB STACK WITH LOGIC ANALYZER PROBES]',
    caption: '[INSERT CAPTION 3: REAL-TIME CAN BUS TELEMETRY & MOTOR CONTROL FIRMWARE]',
    technicalMetadata: '[INSERT FIRMWARE SPECS: STM32G4 · 40KHZ CURRENT LOOP · EMBEDDED C/C++]',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    trackEvent('slideshow_navigation', {
      category: 'project_view',
      action: 'prev_slide',
      label: `Slide ${currentSlide + 1}`,
    });
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    trackEvent('slideshow_navigation', {
      category: 'project_view',
      action: 'next_slide',
      label: `Slide ${currentSlide + 1}`,
    });
  };

  return (
    <section id="overview" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Identity & Overview */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
                <span>[INSERT AFFILIATION / LAB]</span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span>[INSERT ENGINEERING DISCIPLINE]</span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span>OPEN SOURCE HARDWARE</span>
              </div>

              {/* Title & Brand Presence */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white" style={{ textWrap: 'balance' }}>
                  EWENBUILDS<span className="text-cyan-400">.xyz</span>
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-slate-300">
                  [INSERT HERO TAGLINE / ENGINEERING TITLE]
                </p>
              </div>

              {/* Bio & Overview Area with Explicit Placeholders */}
              <div className="space-y-4 text-slate-400 leading-relaxed text-base border-l border-cyan-500/30 pl-4 py-1">
                <p>
                  [INSERT DETAILED INTRODUCTORY BIO: Hardware design, rapid prototyping, precision mechanics, and embedded firmware development portfolio.]
                </p>
                <p className="text-sm font-mono text-slate-500">
                  <strong className="text-slate-300 font-sans">Core Focus:</strong> [INSERT CORE RESEARCH / ENGINEERING FOCUS]
                </p>
                <p className="text-sm font-mono text-slate-500">
                  <strong className="text-slate-300 font-sans">Toolchain:</strong> [INSERT TOOLCHAIN: CAD, CAM, 3D PRINTING, EMBEDDED C/C++, PYTHON, ROS2]
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  onClick={() => trackEvent('cta_click', { category: 'navigation', action: 'click_hero_projects' })}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all duration-150 shadow-sm shadow-cyan-500/20 flex items-center gap-2"
                >
                  <Box className="w-4 h-4" />
                  <span>Browse Projects</span>
                </a>
                <a
                  href="#build-guides"
                  onClick={() => trackEvent('cta_click', { category: 'navigation', action: 'click_hero_build_guides' })}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all duration-150 flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>3D Models &amp; Build Guides</span>
                </a>
              </div>
            </div>

            {/* Quick Spec Strip */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider">Repository</span>
                <span className="text-sm font-semibold text-slate-200">[INSERT STATUS]</span>
              </div>
              <div>
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider">License</span>
                <span className="text-sm font-semibold text-slate-200">[INSERT LICENSE]</span>
              </div>
              <div>
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider">CAD Format</span>
                <span className="text-sm font-semibold text-slate-200">[INSERT CAD SPEC]</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Smooth Photo Slideshow */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[420px] relative group">
              {/* Slideshow Screen Viewport */}
              <div className="relative flex-1 bg-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden min-h-[340px]">
                {/* Engineering Grid / Crosshair Background */}
                <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

                {/* Technical Corner Brackets */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-500/40" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-500/40" />

                {/* Active Slide Display */}
                <div className="relative z-10 max-w-md w-full space-y-4 px-4 py-8">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Box className="w-8 h-8 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block text-xs font-mono text-cyan-400 font-semibold px-2 py-0.5 bg-cyan-950/60 border border-cyan-800/40 rounded">
                      SLIDE {currentSlide + 1} OF {slides.length}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {slides[currentSlide].imagePlaceholder}
                    </h3>
                    <p className="text-sm font-mono text-slate-400">
                      {slides[currentSlide].caption}
                    </p>
                  </div>

                  <div className="pt-2 text-xs font-mono text-slate-500 border-t border-slate-800/80">
                    {slides[currentSlide].technicalMetadata}
                  </div>
                </div>

                {/* Slideshow Arrow Navigation */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-900/80 hover:bg-cyan-500/20 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/50 transition-all opacity-80 group-hover:opacity-100"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-900/80 hover:bg-cyan-500/20 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/50 transition-all opacity-80 group-hover:opacity-100"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Slideshow Bottom Bar & Controls */}
              <div className="px-5 py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => {
                        setCurrentSlide(index);
                        trackEvent('slideshow_navigation', {
                          category: 'project_view',
                          action: 'select_slide_index',
                          label: `Slide ${index + 1}`,
                        });
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentSlide === index ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Jump to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500">
                    AUTO-CYCLE: {isPlaying ? 'ON' : 'PAUSED'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    title={isPlaying ? 'Pause auto-rotation' : 'Resume auto-rotation'}
                    aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
