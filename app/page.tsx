import React from "react";
import dynamic from "next/dynamic";
import AmbientBackground from "../components/visuals/AmbientBackground";
import ParticleSystem from "../components/visuals/ParticleSystem";
import HeroVisual from "../components/visuals/HeroVisual";
import HeroSection from "../components/sections/HeroSection";

// Lazy load heavy sections below the fold
const RippleSection = dynamic(
  () => import("../components/sections/RippleSection"),
  {
    loading: () => <div className="h-[50vh]" />,
  }
);
const DepthSection = dynamic(
  () => import("../components/sections/DepthSection"),
  {
    loading: () => <div className="h-[100vh]" />,
  }
);
const VoidKnowledgeSection = dynamic(
  () => import("../components/sections/VoidKnowledgeSection"),
  {
    loading: () => <div className="h-[100vh]" />,
  }
);
const Footer = dynamic(() => import("../components/sections/Footer"));

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
      <AmbientBackground />
      <ParticleSystem />

      {/* Global 3D Visual for Hero */}
      <HeroVisual />

      <main className="relative z-10">
        <HeroSection />
        <RippleSection />
        <DepthSection />
        <VoidKnowledgeSection />
        <Footer />
      </main>
    </div>
  );
}
