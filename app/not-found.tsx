import Link from "next/link";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function NotFound() {
  return (
    <div className="max-h-screen flex flex-col bg-[#f2eddc]">
      <Navbar />
      <div className="py-8 space-y-4  flex items-center justify-center flex-col h-screen">
        <Header title="404" />
        <p className="text-xl text-gray-400">
          Could not find requested resource
        </p>
        <Button size="lg" asChild>
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
}
