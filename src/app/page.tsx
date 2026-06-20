import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Pricing } from "@/components/site/pricing";
import { About } from "@/components/site/about";
import { VideoSection } from "@/components/site/video";
import { Services } from "@/components/site/services";
import { Integrations } from "@/components/site/integrations";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { CtaBanner } from "@/components/site/cta";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { StructuredData } from "@/components/site/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <VideoSection />
        <Services />
        <About />
        <Integrations />
        <Pricing />
        <Testimonials />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
