"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

  useEffect(() => {
    if (isTouch || !dotRef.current || !outlineRef.current) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;

    gsap.set([dot, outline], { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(outline, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
    };

    const onHoverStart = () => {
      gsap.to([dot, outline], { scale: 2.5, duration: 0.3, ease: "power2.out" });
      gsap.to(outline, { borderColor: "rgba(201, 169, 110, 0.5)", duration: 0.3 });
      gsap.to(dot, { backgroundColor: "rgba(201, 169, 110, 0.8)", duration: 0.3 });
    };

    const onHoverEnd = () => {
      gsap.to([dot, outline], { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(outline, { borderColor: "rgba(234, 232, 225, 0.15)", duration: 0.3 });
      gsap.to(dot, { backgroundColor: "rgba(201, 169, 110, 1)", duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const hoverables = document.querySelectorAll("a, button, .cursor-pointer, .coll-card, .prj-img-wrap");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onHoverStart);
      el.addEventListener("mouseleave", onHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverStart);
        el.removeEventListener("mouseleave", onHoverEnd);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99999 }}
      />
      <div
        ref={outlineRef}
        className="cursor-outline"
        style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99998 }}
      />
    </>
  );
}
