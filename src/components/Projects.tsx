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

    // Entrance
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
      },
    });

    entranceTl.fromTo(".proj-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
    entranceTl.fromTo(".proj-heading-line", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out" }, 0.15);
    entranceTl.fromTo(".proj-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.4);
    entranceTl.fromTo(".proj-line-accent", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.2);
    entranceTl.fromTo(".proj-hero-img", { clipPath: "circle(0% at 50% 50%)", scale: 0.9, opacity: 0 }, { clipPath: "circle(100% at 50% 50%)", scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }, 0.3);

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray(".proj-card") as HTMLElement[];
      cards.forEach((card, i) => {
        const img = card.querySelector(".proj-img") as HTMLElement;
        const overlay = card.querySelector(".proj-overlay") as HTMLElement;
        const content = card.querySelector(".proj-content") as HTMLElement;
        const arrow = card.querySelector(".proj-arrow") as HTMLElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            end: "top 25%",
            scrub: 1.4,
          },
        });

        if (img) {
          tl.fromTo(img,
            { clipPath: i % 2 === 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", scale: 1.15 },
            { clipPath: "inset(0 0 0 0)", scale: 1, duration: 1.4, ease: "power3.inOut" },
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
          tl.fromTo(arrow, { scale: 0, opacity: 0, rotation: -45 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(3)" }, 0.6);
        }

        // Hover
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / centerY * -3;
          const rotateY = (x - centerX) / centerX * 3;

          gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1200 });
          if (img) gsap.to(img, { scale: 1.06, duration: 0.7, ease: "power2.out" });
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

      // Banner
      gsap.fromTo(".proj-banner",
        { clipPath: "inset(0 100% 0 0)", scale: 1.05 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.8, ease: "power3.inOut", scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 65%", end: "top 25%", scrub: 1.5 } }
      );

      gsap.fromTo(".proj-banner-content",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 60%", end: "top 20%", scrub: 1.2 } }
      );

      // Bottom images
      gsap.fromTo(".proj-bottom-img",
        { y: 50, opacity: 0, rotate: 8, scale: 0.85 },
        { y: 0, opacity: 1, rotate: 0, scale: 1, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".proj-bottom-images", start: "top 75%", end: "top 45%", scrub: 1.2 } }
      );

      // Parallax
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

      // Section exit
      gsap.to(".proj-hero-img", {
        opacity: 0.4,
        scale: 0.95,
        ease: "none",
        scrollTrigger: { trigger: ".proj-hero-img", start: "bottom 15%", end: "bottom top", scrub: true },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray(".proj-card") as HTMLElement[];
      cards.forEach((card, i) => {
        const img = card.querySelector(".proj-img") as HTMLElement;
        const content = card.querySelector(".proj-content") as HTMLElement;
        const arrow = card.querySelector(".proj-arrow") as HTMLElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "top 20%",
            scrub: 1.2,
          },
        });

        if (img) {
          tl.fromTo(img,
            { clipPath: i % 2 === 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", scale: 1.1 },
            { clipPath: "inset(0 0 0 0)", scale: 1, duration: 1.2, ease: "power3.inOut" },
            0
          );
        }

        if (content) {
          tl.fromTo(content.children,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
            0.5
          );
        }

        if (arrow) {
          tl.fromTo(arrow, { scale: 0, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.4, ease: "back.out(3)" }, 0.6);
        }

        // Touch feedback
        card.addEventListener("touchstart", () => {
          if (navigator.vibrate) navigator.vibrate(5);
          const imgInner = img?.querySelector("div");
          const overlay = card.querySelector(".proj-overlay") as HTMLElement;
          if (imgInner) gsap.to(imgInner, { scale: 1.06, duration: 0.4, ease: "power2.out" });
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

      // Banner
      gsap.fromTo(".proj-banner",
        { clipPath: "inset(0 100% 0 0)", scale: 1.03 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.5, ease: "power3.inOut", scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 65%", end: "top 25%", scrub: 1.5 } }
      );

      gsap.fromTo(".proj-banner-content",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 60%", end: "top 20%", scrub: 1.2 } }
      );

      // Bottom images
      gsap.fromTo(".proj-bottom-img",
        { y: 35, opacity: 0, rotate: 6, scale: 0.9 },
        { y: 0, opacity: 1, rotate: 0, scale: 1, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".proj-bottom-images", start: "top 75%", end: "top 45%", scrub: 1.2 } }
      );

      // Parallax
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

      {/* Accent line */}
      <div className="proj-line-accent absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left" style={{ opacity: 0 }} />

      <div style={{ paddingTop: "clamp(8rem, 14vw, 16rem)", paddingBottom: "clamp(8rem, 14vw, 16rem)" }}>
        <div className="wrap">
          {/* Header + Hero image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-16 md:mb-24" style={{ gap: "clamp(3rem, 6vw, 6rem)", alignItems: "end" }}>
            <div className="lg:col-span-4">
              <p className="proj-label t-label text-accent tracking-[0.35em]" style={{ opacity: 0 }}>Selected Projects</p>
              <h2 className="proj-heading mt-4 md:mt-6" style={{ lineHeight: 1 }}>
                <div className="overflow-hidden mb-1"><span className="proj-heading-line block t-display text-text" style={{ opacity: 0 }}>Where vision</span></div>
                <div className="overflow-hidden"><span className="proj-heading-line block t-display text-accent italic" style={{ opacity: 0 }}>meets material.</span></div>
              </h2>
              <p className="proj-sub t-body-lg mt-4 md:mt-6 max-w-sm text-text-50" style={{ opacity: 0 }}>A selection of projects specified with Raw Select materials.</p>
            </div>

            <div className="lg:col-span-8 relative">
              <div className="proj-hero-img relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "16/10", opacity: 0 }}>
                <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url(/photo-1616046229478-9901c5536a45.avif)", height: "120%", top: "-10%" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-2/50 to-transparent" />
                <div className="absolute inset-0 border border-text-08" style={{ margin: "clamp(1.5rem, 3vw, 2rem)" }} />
              </div>
            </div>
          </div>

          {/* Project cards - 2 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 mb-8 md:mb-12" style={{ gap: "clamp(2rem, 4vw, 3rem)" }}>
            {projects.slice(0, 2).map((p, i) => (
              <div key={i} className="proj-card relative overflow-hidden cursor-pointer group tap-ripple rounded-sm" style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
                onClick={() => openZoom(p.img)}
              >
                <div className="proj-img w-full aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: `url(${p.img})` }} />
                </div>
                <div className="proj-overlay absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/20 to-transparent opacity-30 transition-opacity duration-500" />
                <div className="proj-content absolute bottom-0 left-0 w-full z-10" style={{ padding: "clamp(2.5rem, 5vw, 4rem)" }}>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="t-label text-accent">{p.type}</span>
                    <span className="t-label text-text-30">{p.year}</span>
                  </div>
                  <h3 className="t-h3 text-text mb-1 md:mb-2">{p.title}</h3>
                  <p className="text-sm text-text-30">{p.location}</p>
                </div>
                <div className="proj-arrow absolute top-8 right-8 w-10 h-10 rounded-full border border-text/20 flex items-center justify-center opacity-0 transition-opacity duration-500">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" /></svg>
                </div>
              </div>
            ))}
          </div>

          {/* Featured banner */}
          <div className="proj-banner-wrap mb-8 md:mb-12">
            <div className="proj-banner relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "21/9" }}>
              <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url(/photo-1583847268964-b28dc8f51f92.avif)", height: "130%", top: "-15%" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-2/70 via-transparent to-bg-2/70" />
              <div className="proj-banner-content absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="t-label text-accent tracking-[0.4em] block mb-3 md:mb-4">FEATURED PROJECT</span>
                  <h3 className="t-h2 text-text">Nordic Spa House</h3>
                  <p className="text-sm text-text-30 mt-2">Stockholm, Sweden — 2024</p>
                </div>
              </div>
              <div className="absolute inset-0 border border-text-08" style={{ margin: "clamp(1rem, 2vw, 1.5rem)" }} />
            </div>
          </div>

          {/* Remaining cards */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(2rem, 4vw, 3rem)" }}>
            {projects.slice(2).map((p, i) => (
              <div key={i + 2} className="proj-card relative overflow-hidden cursor-pointer group tap-ripple rounded-sm" style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
                onClick={() => openZoom(p.img)}
              >
                <div className="proj-img w-full aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: `url(${p.img})` }} />
                </div>
                <div className="proj-overlay absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/20 to-transparent opacity-30 transition-opacity duration-500" />
                <div className="proj-content absolute bottom-0 left-0 w-full z-10" style={{ padding: "clamp(2.5rem, 5vw, 4rem)" }}>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="t-label text-accent">{p.type}</span>
                    <span className="t-label text-text-30">{p.year}</span>
                  </div>
                  <h3 className="t-h3 text-text mb-1 md:mb-2">{p.title}</h3>
                  <p className="text-sm text-text-30">{p.location}</p>
                </div>
                <div className="proj-arrow absolute top-8 right-8 w-10 h-10 rounded-full border border-text/20 flex items-center justify-center opacity-0 transition-opacity duration-500">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" /></svg>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom image thumbnails */}
          <div className="proj-bottom-images flex items-center justify-center mt-16 md:mt-24" style={{ gap: "clamp(2rem, 4vw, 4rem)" }}>
            <div className="proj-bottom-img rounded-sm overflow-hidden border border-text-08 tap-active cursor-pointer" style={{ width: "clamp(90px, 12vw, 150px)", height: "clamp(90px, 12vw, 150px)" }} onClick={() => openZoom("/premium_photo-1681113076872-c74b8926e70c.avif")}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/premium_photo-1681113076872-c74b8926e70c.avif)" }} />
            </div>
            <div className="proj-bottom-img rounded-sm overflow-hidden border border-text-08 tap-active cursor-pointer" style={{ width: "clamp(110px, 15vw, 190px)", height: "clamp(110px, 15vw, 190px)" }} onClick={() => openZoom("/premium_photo-1670360414483-64e6d9ba9038.avif")}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/premium_photo-1670360414483-64e6d9ba9038.avif)" }} />
            </div>
            <div className="proj-bottom-img rounded-sm overflow-hidden border border-text-08 tap-active cursor-pointer" style={{ width: "clamp(90px, 12vw, 150px)", height: "clamp(90px, 12vw, 150px)" }} onClick={() => openZoom("/photo-1618220179428-22790b461013.avif")}>
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
