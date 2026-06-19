import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Projects from "@/components/Projects";
import Advantages from "@/components/Advantages";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Products />
        <Projects />
        <Advantages />
        <Gallery />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
