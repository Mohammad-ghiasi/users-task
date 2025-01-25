import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      <Features />
      {/* Footer */}
      <Footer />
    </div>
  );
}
