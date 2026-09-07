import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import Process from "@/components/sections/Process";
import Technology from "@/components/sections/Technology";
import BigStatement from "@/components/sections/BigStatement";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <CaseStudies />
      <Process />
      <Technology />
      <BigStatement />
      <Stats />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
