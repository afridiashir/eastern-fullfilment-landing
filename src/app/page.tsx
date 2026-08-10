import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { IntroReel } from "@/components/site/intro-reel";
import { Pricing } from "@/components/site/pricing";
import { About } from "@/components/site/about";
import { VideoSection } from "@/components/site/video";
import { Services } from "@/components/site/services";
import { OrderProcess } from "@/components/site/order-process";
import { Integrations } from "@/components/site/integrations";
import { Testimonials } from "@/components/site/testimonials";
import { CollarsMilestone } from "@/components/site/collars-milestone";
import { CaseStudySpotlight } from "@/components/site/case-study-spotlight";
import { Faq } from "@/components/site/faq";
import { CtaBanner } from "@/components/site/cta";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { StructuredData } from "@/components/site/structured-data";
import HeroVideo from "@/components/site/HeroVideo";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main className="flex-1">
        {/* Desktop gets the scroll-scrubbed reel; tablet and below get the hero. */}
        <div className="hidden lg:block">
          {/* <IntroReel /> */}
          <HeroVideo />
        </div>
        <div className="lg:hidden">
          <Hero />
        </div>
        <div className="lg:hidden">
          <VideoSection />
        </div>
        <Services />
        {/* <OrderProcess /> */}
        <About />
        <Integrations />
        {/* <Pricing /> */}
        <Testimonials />
        <CollarsMilestone />
        {/* <CaseStudySpotlight /> */}
        <Faq />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
