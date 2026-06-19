"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface LightboxProps {
  images: readonly string[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  alt?: string;
}

export default function Lightbox({ images, index, onClose, onIndex, alt = "" }: LightboxProps) {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onIndex((index + 1) % images.length);
  }, [index, images.length, onIndex]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndex((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev, onClose]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-night/92 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            aria-label="Fermer"
            onClick={onClose}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            aria-label="Précédent"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10 sm:left-8"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[78vh] w-[92vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={images[index]} alt={alt} fill sizes="92vw" className="object-contain" />
          </motion.div>

          <button
            aria-label="Suivant"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10 sm:right-8"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tracking-widest text-white/70">
            {index + 1} / {images.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
