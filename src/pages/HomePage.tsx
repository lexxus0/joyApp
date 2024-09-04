import HeroSection from "../components/homepage/HeroSection";
import TestimonialsSection from "../components/homepage/Testimonials";
import BenefitsSection from "../components/homepage/Benefits";
import Footer from "../components/homepage/Footer";
import AboutUs from "../components/homepage/AboutUs";
import HowItWorksSection from "../components/homepage/HowItWorksSection";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />

      <div className="mt-36">
        <AboutUs />
      </div>

      <div className="mt-36">
        <HowItWorksSection />
      </div>

      <div className="container mx-auto px-4 ">
        <div className="mt-36">
          <BenefitsSection />
        </div>
        <div className="mt-36">
          <TestimonialsSection />
        </div>
        <div className="mt-36">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
