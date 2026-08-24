import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolarSimulator from "@/components/simulator/SolarSimulator";

export const metadata: Metadata = {
  title: "Simulateur Solaire — Estimez votre installation | SOLARGEN GROUP",
  description:
    "Simulateur gratuit SOLARGEN GROUP : répondez à quelques questions sur vos équipements (climatiseurs, électroménager...) et obtenez instantanément une estimation du nombre de panneaux, batteries et de l'onduleur nécessaires à Djibouti.",
};

export default function SimulateurPage() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main className="pt-24">
        <SolarSimulator />
      </main>
      <Footer />
    </>
  );
}
