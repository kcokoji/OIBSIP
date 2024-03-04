"use client"; // Error components must be Client Components

import Navbar from "@/components/navbar";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-h-screen flex flex-col bg-[#f2eddc]">
      <Navbar />
      <div className="py-8 space-y-4 h-screen flex items-center flex-col">
        <Header title="505" />
        <p className="text-xl text-gray-400">Something went wrong</p>
        <Button
          size="lg"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
      <Footer />
    </div>
  );
}
