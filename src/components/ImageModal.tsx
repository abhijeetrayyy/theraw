"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface ImageModalProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ src, isOpen, onClose }: ImageModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.fromTo(imgRef.current, { scale: 0.8, opacity: 0, clipPath: "circle(0% at 50% 50%)" }, { scale: 1, opacity: 1, clipPath: "circle(100% at 50% 50%)", duration: 0.6, ease: "power3.out" }, 0.1);
    } else if (visible) {
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          document.body.style.overflow = "";
        },
      });
      tl.to(imgRef.current, { scale: 0.8, opacity: 0, clipPath: "circle(0% at 50% 50%)", duration: 0.4, ease: "power2.in" }, 0);
      tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.1);
    }
  }, [isOpen, visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-xl"
      style={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors tap-active"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close image"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div
        ref={imgRef}
        className="w-full h-full md:w-[85vw] md:h-[85vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${src})`, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
