"use client";

import { useEffect, useRef, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import DesktopOnly from "@/components/DesktopOnly";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Marquee from "@/components/Marquee";
import Difference from "@/components/Difference";
import Collection from "@/components/Collection";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import gsap from "gsap";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 3000;
    const milestones = [25, 50, 75, 100];
    let lastMilestone = 0;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.round(eased * 100);
      setCount(currentCount);

      for (const m of milestones) {
        if (currentCount >= m && lastMilestone < m) {
          if (navigator.vibrate) navigator.vibrate(8);
          lastMilestone = m;
        }
      }

      if (lineRef.current) {
        lineRef.current.style.transform = `scaleX(${eased})`;
      }

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setLoaded(true), 500);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loaded || !preloaderRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        preloaderRef.current?.style.setProperty("display", "none");
        window.scrollTo(0, 0);
      },
    });

    tl.to(counterRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.in",
    }, 0);

    tl.to(lineRef.current, {
      scaleX: 1.5,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, 0.2);

    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 1.4,
      ease: "power4.inOut",
    }, 0.5);

    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.in" }, 0.4
    );
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, 0.7);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    const isMobile = window.innerWidth < 1024;
    const grain = document.createElement("div");
    grain.style.cssText = `
      position: fixed; inset: 0; z-index: 9998; pointer-events: none; opacity: ${isMobile ? 0.025 : 0.04};
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      mix-blend-mode: multiply;
    `;
    document.body.appendChild(grain);

    return () => { grain.remove(); };
  }, [loaded]);

  return (
    <>
      {!loaded && (
        <div ref={preloaderRef} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "2rem" }}>
          <div ref={counterRef} className="font-serif" style={{ fontSize: "clamp(5rem, 14vw, 12rem)", letterSpacing: "-0.04em", color: "var(--color-text)", lineHeight: 1, fontWeight: 400 }}>{count}</div>
          <div style={{ width: "120px", height: "1px", background: "var(--color-text-08)", position: "relative", overflow: "hidden" }}>
            <div ref={lineRef} style={{ position: "absolute", inset: 0, background: "var(--color-accent)", transformOrigin: "left", transform: "scaleX(0)" }} />
          </div>
          <span className="t-label" style={{ color: "var(--color-muted)", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.6rem" }}>Raw Select</span>
        </div>
      )}

      <div ref={overlayRef} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "var(--color-bg)", opacity: 0, pointerEvents: "none" }} />

      <DesktopOnly>
        <SmoothScroll>
          <Cursor />
          <Nav loaded={loaded} />
          <main style={{ opacity: loaded ? 1 : 0, transition: "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}>
            <Hero />
            <Philosophy />
            <Marquee />
            <Difference />
            <Collection />
            <Process />
            <Testimonials />
            <Projects />
            <Cta />
            <Footer />
          </main>
        </SmoothScroll>
      </DesktopOnly>
    </>
  );
}
