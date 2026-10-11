import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyFermor } from "@/components/landing/WhyFermor";
import { FinancialSnapshot } from "@/components/landing/FinancialSnapshot";
import { FAQ } from "@/components/landing/FAQ";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

/** Fermor homepage — premium fintech landing page, colorful theme. */
export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-fm-char">
      <Navbar />
      <main>
        <Hero />
        <FeatureSection />
        <ProductPreview />
        <HowItWorks />
        <WhyFermor />
        <FinancialSnapshot />
        <FAQ />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
