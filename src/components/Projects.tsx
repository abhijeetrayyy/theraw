"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageModal from "@/components/ImageModal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Meridian Residence", location: "Copenhagen, Denmark", year: "2025", type: "Residential", img: "/photo-1616046229478-9901c5536a45.avif" },
  { title: "Atelier Noir", location: "Melbourne, Australia", year: "2025", type: "Commercial", img: "/photo-1618220179428-22790b461013.avif" },
  { title: "The Glass Pavilion", location: "Oslo, Norway", year: "2024", type: "Residential", img: "/photo-1618221195710-dd6b41faaea6.avif" },
  { title: "Nordic Spa House", location: "Stockholm, Sweden", year: "2024", type: "Hospitality", img: "/photo-1583847268964-b28dc8f51f92.avif" },
  { title: "Urban Loft Conversion", location: "Berlin, Germany", year: "2024", type: "Residential", img: "/premium_photo-1681113076872-c74b8926e70c.avif" },
  { title: "Coastal Retreat", location: "Sydney, Australia", year: "2023", type: "Residential", img: "/premium_photo-1670360414483-64e6d9ba9038.avif" },
];

export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoom = (src: string) => {
    if (navigator.vibrate) navigator.vibrate(8);
    setZoomedImage(src);
  };
  const closeZoom = () => setZoomedImage(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    gsap.utils.toArray(".proj-float").forEach((shape, i) => {
      gsap.to(shape as Element, { y: `random(-50, 50)`, x: `random(-30, 30)`, rotation: `random(-15, 15)`, scale: `random(0.8, 1.3)`, duration: `random(6, 10)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: (i as number) * 0.6 });
    });

    gsap.to(".proj-bg-pulse", {
      opacity: 0.03,
      scale: 1.06,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    mm.add("(min-width: 1024px)", () => {
      const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 60%", end: "top 20%", scrub: 1.5 } });
      headerTl.fromTo(".proj-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.4, ease: "power2.inOut", transformOrigin: "left" }, 0);
      headerTl.fromTo(".proj-label-word", { y: "120%", opacity: 0, rotateX: -60 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.08, duration: 1, ease: "power3.out" }, 0.15);
      headerTl.fromTo(".proj-heading-mask", { yPercent: 140, opacity: 0, rotateX: -30 }, { yPercent: 0, opacity: 1, rotateX: 0, stagger: 0.14, duration: 1.6, ease: "power4.out" }, 0.25);
      headerTl.fromTo(".proj-sub", { y: 35, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 0.8);
      headerTl.fromTo(".proj-accent-img-1",
        { clipPath: "inset(0 100% 0 0)", scale: 1.15, filter: "blur(8px)" },
        { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 1.6, ease: "power3.inOut" },
        0.35
      );
      headerTl.fromTo(".proj-accent-img-2",
        { clipPath: "inset(0 0 0 100%)", scale: 1.15, filter: "blur(8px)" },
        { clipPath: "inset(0 0 0 0%)", scale: 1, filter: "blur(0px)", duration: 1.6, ease: "power3.inOut" },
        0.45
      );
      headerTl.fromTo(".proj-hero-img",
        { clipPath: "circle(0% at 50% 50%)", scale: 0.85, opacity: 0 },
        { clipPath: "circle(100% at 50% 50%)", scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" },
        0.55
      );

      const cards = gsap.utils.toArray(".proj-card") as HTMLElement[];
      cards.forEach((card, i) => {
        const img = card.querySelector(".proj-img") as HTMLElement;
        const overlay = card.querySelector(".proj-overlay") as HTMLElement;
        const content = card.querySelector(".proj-content") as HTMLElement;
        const arrow = card.querySelector(".proj-arrow") as HTMLElement;

        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 70%", end: "top 20%", scrub: 1.4 } });

        if (img) {
          tl.fromTo(img,
            { clipPath: (i as number) % 2 === 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", scale: 1.2, filter: "blur(8px)" },
            { clipPath: "inset(0 0 0 0)", scale: 1, filter: "blur(0px)", duration: 1.6, ease: "power3.inOut" },
            0
          );
        }

        if (content) {
          tl.fromTo(content.children,
            { y: 35, opacity: 0, filter: "blur(4px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.1, duration: 0.8, ease: "power3.out" },
            0.6
          );
        }

        if (arrow) {
          tl.fromTo(arrow, { scale: 0, opacity: 0, rotation: -45 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(3)" }, 0.7);
        }

        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / centerY * -3.5;
          const rotateY = (x - centerX) / centerX * 3.5;

          gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1200 });
          if (img) gsap.to(img, { scale: 1.08, duration: 0.7, ease: "power2.out" });
          if (overlay) gsap.to(overlay, { opacity: 0.55, duration: 0.5 });
          if (arrow) gsap.to(arrow, { scale: 1.1, opacity: 1, duration: 0.4 });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" });
          if (img) gsap.to(img, { scale: 1, duration: 0.7, ease: "power2.out" });
          if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.5 });
          if (arrow) gsap.to(arrow, { scale: 1, opacity: 0, duration: 0.4 });
        });
      });

      gsap.fromTo(".proj-banner",
        { clipPath: "inset(0 100% 0 0)", scale: 1.08, filter: "blur(6px)" },
        { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 2.2, ease: "power3.inOut", scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 65%", end: "top 25%", scrub: 1.5 } }
      );

      gsap.fromTo(".proj-banner-content",
        { y: 40, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 60%", end: "top 20%", scrub: 1.2 } }
      );

      gsap.fromTo(".proj-bottom-img",
        { y: 70, opacity: 0, rotate: 8, scale: 0.85 },
        { y: 0, opacity: 1, rotate: 0, scale: 1, stagger: 0.18, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".proj-bottom-images", start: "top 75%", end: "top 45%", scrub: 1.2 } }
      );

      // Section exit
      gsap.to(".proj-hero-img", {
        opacity: 0.3,
        scale: 0.95,
        ease: "none",
        scrollTrigger: { trigger: ".proj-hero-img", start: "bottom 20%", end: "bottom top", scrub: true },
      });

      const heroImg = document.querySelector(".proj-hero-img") as HTMLElement;
      if (heroImg) {
        gsap.to(heroImg.querySelector("div"), {
          yPercent: -15, ease: "none",
          scrollTrigger: { trigger: heroImg, start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      const banner = document.querySelector(".proj-banner") as HTMLElement;
      if (banner) {
        gsap.to(banner.querySelector("div"), {
          yPercent: -12, ease: "none",
          scrollTrigger: { trigger: banner, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    });

      mm.add("(max-width: 1023px)", () => {
      const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 60%", end: "top 20%", scrub: 1.5 } });
      headerTl.fromTo(".proj-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.4, ease: "power2.inOut", transformOrigin: "left" }, 0);
      headerTl.fromTo(".proj-label-word", { y: "120%", opacity: 0, rotateX: -60 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.08, duration: 1, ease: "power3.out" }, 0.15);
      headerTl.fromTo(".proj-heading-mask", { yPercent: 140, opacity: 0, rotateX: -30 }, { yPercent: 0, opacity: 1, rotateX: 0, stagger: 0.14, duration: 1.6, ease: "power4.out" }, 0.25);
      headerTl.fromTo(".proj-sub", { y: 35, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 0.8);
      headerTl.fromTo(".proj-hero-img",
        { clipPath: "circle(0% at 50% 50%)", scale: 0.9, opacity: 0 },
        { clipPath: "circle(100% at 50% 50%)", scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" },
        0.4
      );
      headerTl.fromTo(".proj-accent-img-1",
        { y: 30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        0.6
      );
      headerTl.fromTo(".proj-accent-img-2",
        { y: 30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        0.7
      );

      const cards = gsap.utils.toArray(".proj-card") as HTMLElement[];
      cards.forEach((card, i) => {
        const img = card.querySelector(".proj-img") as HTMLElement;
        const content = card.querySelector(".proj-content") as HTMLElement;
        const arrow = card.querySelector(".proj-arrow") as HTMLElement;

        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 75%", end: "top 20%", scrub: 1.2 } });

        if (img) {
          tl.fromTo(img,
            { clipPath: (i as number) % 2 === 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", scale: 1.15, filter: "blur(6px)" },
            { clipPath: "inset(0 0 0 0)", scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.inOut" },
            0
          );
        }

        if (content) {
          tl.fromTo(content.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out" },
            0.5
          );
        }

        if (arrow) {
          tl.fromTo(arrow, { scale: 0, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.4, ease: "back.out(3)" }, 0.6);
        }

        // Mobile touch feedback with premium scale
        card.addEventListener("touchstart", () => {
          if (navigator.vibrate) navigator.vibrate(5);
          const imgInner = img?.querySelector("div");
          const overlay = card.querySelector(".proj-overlay") as HTMLElement;
          if (imgInner) gsap.to(imgInner, { scale: 1.08, duration: 0.4, ease: "power2.out" });
          if (overlay) gsap.to(overlay, { opacity: 0.65, duration: 0.4 });
          gsap.to(card, { scale: 0.98, duration: 0.2 });
        }, { passive: true });
        card.addEventListener("touchend", () => {
          const imgInner = img?.querySelector("div");
          const overlay = card.querySelector(".proj-overlay") as HTMLElement;
          if (imgInner) gsap.to(imgInner, { scale: 1, duration: 0.5, ease: "power2.out" });
          if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.5 });
          gsap.to(card, { scale: 1, duration: 0.3 });
        }, { passive: true });
      });

      gsap.fromTo(".proj-banner",
        { clipPath: "inset(0 100% 0 0)", scale: 1.05, filter: "blur(4px)" },
        { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 1.8, ease: "power3.inOut", scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 65%", end: "top 25%", scrub: 1.5 } }
      );

      gsap.fromTo(".proj-banner-content",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 60%", end: "top 20%", scrub: 1.2 } }
      );

      gsap.fromTo(".proj-bottom-img",
        { y: 40, opacity: 0, rotate: 6, scale: 0.9 },
        { y: 0, opacity: 1, rotate: 0, scale: 1, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".proj-bottom-images", start: "top 75%", end: "top 45%", scrub: 1.2 } }
      );

      // Mobile image parallax on cards
      gsap.utils.toArray(".proj-img").forEach((imgWrap) => {
        const el = imgWrap as HTMLElement;
        const inner = el.querySelector("div") as HTMLElement;
        if (inner) {
          gsap.to(inner, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: el.closest(".proj-card"), start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });

      // Mobile hero image parallax
      const heroImg = document.querySelector(".proj-hero-img") as HTMLElement;
      if (heroImg) {
        gsap.to(heroImg.querySelector("div"), {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: heroImg, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    });
  }, { scope: section });

  return (
    <section id="projects" ref={section} className="relative bg-bg-2 overflow-hidden">
      <div className="divider" />

      <div className="proj-bg-pulse absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 60% 40%, var(--color-accent-dim) 0%, transparent 65%)", opacity: 0, transform: "scale(1)" }} />

      <div className="proj-float absolute top-[10%] right-[8%] w-20 h-20 rounded-full border border-accent/10 pointer-events-none" />
      <div className="proj-float absolute bottom-[15%] left-[10%] w-14 h-14 rounded-full bg-accent-dim pointer-events-none" />
      <div className="proj-float absolute top-[40%] left-[5%] w-10 h-10 rounded-full border border-text/10 pointer-events-none" />

      <div style={{ paddingTop: "clamp(10rem, 18vw, 20rem)", paddingBottom: "clamp(10rem, 18vw, 20rem)" }}>
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(3rem, 6vw, 6rem)", alignItems: "end", marginBottom: "clamp(8rem, 16vw, 16rem)" }}>
            <div className="lg:col-span-4">
              <div className="proj-line w-14 h-[1px] bg-accent origin-left" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }} />
              <span className="t-label text-accent tracking-[0.35em] block" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
                {"Selected Projects".split(" ").map((w, i) => (<span key={i} className="proj-label-word inline-block mr-[0.3em]">{w}</span>))}
              </span>
              <div className="proj-heading">
                <div className="overflow-hidden" style={{ marginBottom: "0.25rem" }}><h2 className="proj-heading-mask t-h1 text-text">Where vision</h2></div>
                <div className="overflow-hidden" style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}><h2 className="proj-heading-mask t-h1 text-accent italic">meets material.</h2></div>
              </div>
              <p className="proj-sub t-body-lg max-w-sm">A selection of projects specified with Raw Select materials. Each one a testament to intentional curation.</p>
            </div>

            <div className="lg:col-span-8 relative">
              <div className="proj-hero-img relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url(/photo-1616046229478-9901c5536a45.avif)", height: "120%", top: "-10%" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-2/50 to-transparent" />
                <div className="absolute inset-0 border border-text-08" style={{ margin: "clamp(1.5rem, 3vw, 2rem)" }} />
              </div>

              <div className="proj-accent-img-1 absolute -bottom-6 -left-6 md:-left-10 w-28 h-28 md:w-36 md:h-36 overflow-hidden rounded-lg shadow-2xl">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1618220179428-22790b461013.avif)" }} />
              </div>

              <div className="proj-accent-img-2 absolute -top-6 -right-6 md:-right-10 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-lg shadow-2xl">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1618221195710-dd6b41faaea6.avif)" }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(3rem, 6vw, 4rem)", marginBottom: "clamp(3rem, 6vw, 4rem)" }}>
            {projects.slice(0, 2).map((p, i) => (
              <div key={i} className="proj-card relative overflow-hidden cursor-pointer group tap-ripple" style={{ transformStyle: "preserve-3d", perspective: "1200px", borderRadius: "12px" }}
                onClick={() => openZoom(p.img)}
              >
                <div className="proj-img w-full aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: `url(${p.img})` }} />
                </div>
                <div className="proj-overlay absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/20 to-transparent opacity-30 transition-opacity duration-500" />
                <div className="proj-content absolute bottom-0 left-0 w-full z-10" style={{ padding: "clamp(2.5rem, 5vw, 4rem)" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}>
                    <span className="t-label text-accent">{p.type}</span>
                    <span className="t-label text-text-30">{p.year}</span>
                  </div>
                  <h3 className="t-h3 text-text" style={{ marginBottom: "clamp(0.5rem, 1vw, 1rem)" }}>{p.title}</h3>
                  <p className="text-sm text-text-30">{p.location}</p>
                </div>
                <div className="proj-arrow absolute top-8 right-8 w-10 h-10 rounded-full border border-text/20 flex items-center justify-center opacity-0 transition-opacity duration-500">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" /></svg>
                </div>
              </div>
            ))}
          </div>

          <div className="proj-banner-wrap" style={{ marginBottom: "clamp(3rem, 6vw, 4rem)" }}>
            <div className="proj-banner relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "21/9" }}>
              <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url(/photo-1583847268964-b28dc8f51f92.avif)", height: "130%", top: "-15%" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-2/70 via-transparent to-bg-2/70" />
              <div className="proj-banner-content absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="t-label text-accent tracking-[0.4em] block" style={{ marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}>FEATURED PROJECT</span>
                  <h3 className="t-h2 text-text">Nordic Spa House</h3>
                  <p className="text-sm text-text-30 mt-2">Stockholm, Sweden — 2024</p>
                </div>
              </div>
              <div className="absolute inset-0 border border-text-08" style={{ margin: "clamp(1rem, 2vw, 1.5rem)" }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(3rem, 6vw, 4rem)" }}>
            {projects.slice(2).map((p, i) => (
              <div key={i + 2} className="proj-card relative overflow-hidden cursor-pointer group tap-ripple" style={{ transformStyle: "preserve-3d", perspective: "1200px", borderRadius: "12px" }}
                onClick={() => openZoom(p.img)}
              >
                <div className="proj-img w-full aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: `url(${p.img})` }} />
                </div>
                <div className="proj-overlay absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/20 to-transparent opacity-30 transition-opacity duration-500" />
                <div className="proj-content absolute bottom-0 left-0 w-full z-10" style={{ padding: "clamp(2.5rem, 5vw, 4rem)" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}>
                    <span className="t-label text-accent">{p.type}</span>
                    <span className="t-label text-text-30">{p.year}</span>
                  </div>
                  <h3 className="t-h3 text-text" style={{ marginBottom: "clamp(0.5rem, 1vw, 1rem)" }}>{p.title}</h3>
                  <p className="text-sm text-text-30">{p.location}</p>
                </div>
                <div className="proj-arrow absolute top-8 right-8 w-10 h-10 rounded-full border border-text/20 flex items-center justify-center opacity-0 transition-opacity duration-500">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" /></svg>
                </div>
              </div>
            ))}
          </div>

          <div className="proj-bottom-images flex items-center justify-center" style={{ marginTop: "clamp(8rem, 16vw, 16rem)", gap: "clamp(2rem, 4vw, 4rem)" }}>
            <div className="proj-bottom-img rounded-lg overflow-hidden border border-text-08 tap-active cursor-pointer" style={{ width: "clamp(90px, 12vw, 150px)", height: "clamp(90px, 12vw, 150px)" }} onClick={() => openZoom("/premium_photo-1681113076872-c74b8926e70c.avif")}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/premium_photo-1681113076872-c74b8926e70c.avif)" }} />
            </div>
            <div className="proj-bottom-img rounded-lg overflow-hidden border border-text-08 tap-active cursor-pointer" style={{ width: "clamp(110px, 15vw, 190px)", height: "clamp(110px, 15vw, 190px)" }} onClick={() => openZoom("/premium_photo-1670360414483-64e6d9ba9038.avif")}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/premium_photo-1670360414483-64e6d9ba9038.avif)" }} />
            </div>
            <div className="proj-bottom-img rounded-lg overflow-hidden border border-text-08 tap-active cursor-pointer" style={{ width: "clamp(90px, 12vw, 150px)", height: "clamp(90px, 12vw, 150px)" }} onClick={() => openZoom("/photo-1618220179428-22790b461013.avif")}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1618220179428-22790b461013.avif)" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />

      <ImageModal src={zoomedImage || ""} isOpen={zoomedImage !== null} onClose={closeZoom} />
    </section>
  );
}
