"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dotRef.current, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.1, ease: "power2.out" });
      gsap.to(outlineRef.current, { x: e.clientX - 18, y: e.clientY - 18, duration: 0.35, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot fixed top-0 left-0" style={{ transform: "translate(0, 0)" }} />
      <div ref={outlineRef} className="cursor-outline fixed top-0 left-0" style={{ transform: "translate(0, 0)" }} />
    </>
  );
}
