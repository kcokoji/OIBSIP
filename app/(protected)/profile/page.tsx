import Navbar from "@/components/navbar";
import React from "react";
import ProfileCard from "./components/profile-form";
import Footer from "@/components/footer";

export default function ProfilePage() {
  return (
    <div className="bg-[#f2eddc]">
      <Navbar />
      <ProfileCard />
      <Footer />
    </div>
  );
}
