import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BuildGuidesSection } from './components/BuildGuidesSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminAnalyticsModal } from './components/AdminAnalyticsModal';

export default function App() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Fixed Navigation Bar with 3-Zone Top Bar Contract */}
      <Navbar onOpenAdminInfo={() => setAdminModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section 1: Hero, Overview & Smooth Photo Slideshow */}
        <HeroSection />

        {/* Section 2: Projects Grid with Native Web Documentation & .zip Downloads */}
        <ProjectsSection />

        {/* Section 3: Build Guides, Google <model-viewer> 3D Engine & Dual Download CTAs */}
        <BuildGuidesSection />

        {/* Section 4: Fully Integrated Engineering Resume & PDF Download */}
        <ResumeSection />

        {/* Section 5: Contact Form (Formspree & Cloudflare Functions) & Channels */}
        <ContactSection />
      </main>

      {/* Footer with Site Summary and Admin Access Link */}
      <Footer onOpenAdminInfo={() => setAdminModalOpen(true)} />

      {/* Cloudflare Admin & Analytics Architecture Modal */}
      <AdminAnalyticsModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}
