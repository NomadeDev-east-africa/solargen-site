import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // L'optimiseur d'images de Next.js (/_next/image) n'est pas fiable sur
    // l'hébergement Node managé de Hostinger : les images passent en erreur
    // et ne s'affichent pas. On sert donc les fichiers directement depuis
    // /public. (Veiller à garder des images déjà compressées dans /public.)
    unoptimized: true,
  },
};

export default nextConfig;
