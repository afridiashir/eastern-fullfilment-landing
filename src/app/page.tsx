import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Pricing } from "@/components/site/pricing";
import { About } from "@/components/site/about";
import { VideoSection } from "@/components/site/video";
import { Services } from "@/components/site/services";
import { Team } from "@/components/site/team";
import { Testimonials } from "@/components/site/testimonials";
import { CtaBanner } from "@/components/site/cta";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <VideoSection />
        <Services />
        <Pricing />
        <About />
        <Team />
        <Testimonials />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
