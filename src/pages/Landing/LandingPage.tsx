import React from "react";
import Navbar from "../../components/Navbar/navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProductsSection from "./ProductsSection" // Assuming you have a ProductsSection component
import ContactSection from "./ContactSection";
import Footer from "../../components/Footer/Footer"; // Assuming you have a Footer component

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-darkBg text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20">
        <div className="flex flex-col w-full">
          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <AboutSection />

          {/* Products Section */}
          <ProductsSection />

          {/* Contact Section */}
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
      
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;