import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="max-h-screen flex flex-col bg-[#f2eddc]">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
