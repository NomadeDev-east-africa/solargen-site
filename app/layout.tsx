import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOLARGEN GROUP — Énergie solaire à Djibouti | Vente & installation",
  description:
    "SOLARGEN GROUP SARL — vente et installation de matériels solaires à Djibouti. Panneaux photovoltaïques, onduleurs et batteries SAJ, étude, pose et maintenance. Un avenir énergétique propre et accessible.",
  keywords: [
    "énergie solaire Djibouti",
    "panneaux solaires Djibouti",
    "installation solaire Djibouti",
    "onduleur SAJ",
    "batterie lithium solaire",
    "SOLARGEN GROUP",
    "photovoltaïque Djibouti",
    "pompage solaire",
  ],
  openGraph: {
    title: "SOLARGEN GROUP — Énergie solaire à Djibouti",
    description:
      "Vente et installation de matériels solaires à Djibouti. Un avenir énergétique propre et accessible.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${sora.variable} ${manrope.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
