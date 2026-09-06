import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import AISection from "@/components/landing/AISection";
import CollaborationSection from "@/components/landing/CollaborationSection";
import TrustSection from "@/components/landing/TrustSection";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AISection />
        <CollaborationSection />
        <TrustSection />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
