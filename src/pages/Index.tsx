import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import RdvPareBrise from "@/components/RdvPareBrise";
import RdvMecanique from "@/components/RdvMecanique";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ReviewsSection />
      <RdvPareBrise />
      <RdvMecanique />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
