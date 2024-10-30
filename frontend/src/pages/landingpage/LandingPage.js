import React from "react";
import Navbar from "../../components/Navbar";
import LandingPage_section1 from "../../components/LandingPage_section1";
import Footer from "../../components/Footer";

export default function LandingPage() {
  return (
    <div className="bg-gray-700">
      <div>
        <Navbar />
      </div>
      <LandingPage_section1 />
      <Footer />
    </div>
  );
}
