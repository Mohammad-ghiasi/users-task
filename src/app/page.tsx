
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: true });
const Features = dynamic(() => import("@/components/Features"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });


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
