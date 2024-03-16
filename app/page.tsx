import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import Features from "@/components/features";
import Subscribe from "@/components/subscribe";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f2eddc]">
      <Navbar />
      <HeroSection />
      <Features />
      <Subscribe />
      <Footer />
    </main>
  );
}
