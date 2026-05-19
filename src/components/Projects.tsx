"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useGSAP(() => {
    // Floating shapes
    gsap.utils.toArray(".proj-float").forEach((shape, i) => {
      gsap.to(shape as Element, { y: `random(-40, 40)`, x: `random(-25, 25)`, rotation: `random(-12, 12)`, duration: `random(5, 8)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.5 });
    });

    // Header entrance
    const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 65%" } });
    headerTl.fromTo(".proj-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left" }, 0);
    headerTl.fromTo(".proj-label-word", { y: "100%", opacity: 0, rotateX: -45 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.9, ease: "power3.out" }, 0.1);
    headerTl.fromTo(".proj-heading-mask", { yPercent: 130 }, { yPercent: 0, stagger: 0.12, duration: 1.4, ease: "power4.out" }, 0.2);
    headerTl.fromTo(".proj-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.7);

    // Header accent images
    headerTl.fromTo(".proj-accent-img-1",
      { clipPath: "inset(0 100% 0 0)", scale: 1.1, filter: "blur(6px)" },
      { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.inOut" },
      0.3
    );
    headerTl.fromTo(".proj-accent-img-2",
      { clipPath: "inset(0 0 0 100%)", scale: 1.1, filter: "blur(6px)" },
      { clipPath: "inset(0 0 0 0%)", scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.inOut" },
      0.4
    );
    headerTl.fromTo(".proj-hero-img",
      { clipPath: "circle(0% at 50% 50%)", scale: 0.9, opacity: 0 },
      { clipPath: "circle(100% at 50% 50%)", scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" },
      0.5
    );

    // Project cards
    const cards = gsap.utils.toArray(".proj-card") as HTMLElement[];
    cards.forEach((card, i) => {
      const img = card.querySelector(".proj-img") as HTMLElement;
      const overlay = card.querySelector(".proj-overlay") as HTMLElement;
      const content = card.querySelector(".proj-content") as HTMLElement;

      const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 75%", end: "top 25%", scrub: 1.2 } });

      if (img) {
        tl.fromTo(img,
          { clipPath: i % 2 === 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", scale: 1.15, filter: "blur(6px)" },
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

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;

        gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: "power2.out", transformPerspective: 1000 });
        if (img) gsap.to(img, { scale: 1.06, duration: 0.6, ease: "power2.out" });
        if (overlay) gsap.to(overlay, { opacity: 0.5, duration: 0.4 });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
        if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.4 });
      });
    });

    // Full-width banner image
    gsap.fromTo(".proj-banner",
      { clipPath: "inset(0 100% 0 0)", scale: 1.05, filter: "blur(4px)" },
      { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.inOut", scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 70%" } }
    );

    // Bottom accent images
    gsap.fromTo(".proj-bottom-img",
      { y: 60, opacity: 0, rotate: 5, scale: 0.9 },
      { y: 0, opacity: 1, rotate: 0, scale: 1, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".proj-bottom-images", start: "top 80%" } }
    );

    // Parallax on header hero image
    const heroImg = document.querySelector(".proj-hero-img") as HTMLElement;
    if (heroImg) {
      gsap.to(heroImg.querySelector("div"), {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: heroImg, start: "top bottom", end: "bottom top", scrub: true },
      });
    }

    // Parallax on banner
    const banner = document.querySelector(".proj-banner") as HTMLElement;
    if (banner) {
      gsap.to(banner.querySelector("div"), {
        yPercent: -10, ease: "none",
        scrollTrigger: { trigger: banner, start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  }, { scope: section });

  return (
    <section id="projects" ref={section} className="relative bg-bg-2 overflow-hidden">
      <div className="divider" />
      {/* Floating shapes */}
      <div className="proj-float absolute top-[10%] right-[8%] w-20 h-20 rounded-full border border-accent/10 pointer-events-none" />
      <div className="proj-float absolute bottom-[15%] left-[10%] w-14 h-14 rounded-full bg-accent-dim pointer-events-none" />
      <div className="proj-float absolute top-[40%] left-[5%] w-10 h-10 rounded-full border border-text/10 pointer-events-none" />

      <div style={{ paddingTop: "clamp(10rem, 18vw, 20rem)", paddingBottom: "clamp(10rem, 18vw, 20rem)" }}>
        <div className="wrap">
          {/* Header with images */}
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
              <p className="proj-sub t-body-lg max-w-sm">A selection of projects specified with Raw Select materials. Each one a testament to the power of intentional curation.</p>
            </div>

            {/* Right side: hero image + accent images */}
            <div className="lg:col-span-8 relative">
              {/* Main hero image */}
              <div className="proj-hero-img relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url(/photo-1616046229478-9901c5536a45.avif)", height: "120%", top: "-10%" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-2/50 to-transparent" />
                <div className="absolute inset-0 border border-text-08" style={{ margin: "clamp(1.5rem, 3vw, 2rem)" }} />
              </div>

              {/* Small accent image 1 - bottom left overlap */}
              <div className="proj-accent-img-1 absolute -bottom-6 -left-6 md:-left-10 w-28 h-28 md:w-36 md:h-36 overflow-hidden rounded-lg border border-text-08 shadow-2xl">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1618220179428-22790b461013.avif)" }} />
              </div>

              {/* Small accent image 2 - top right overlap */}
              <div className="proj-accent-img-2 absolute -top-6 -right-6 md:-right-10 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-lg border border-text-08 shadow-2xl">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1618221195710-dd6b41faaea6.avif)" }} />
              </div>
            </div>
          </div>

          {/* Project cards - first row */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(3rem, 6vw, 4rem)", marginBottom: "clamp(3rem, 6vw, 4rem)" }}>
            {projects.slice(0, 2).map((p, i) => (
              <div key={i} className="proj-card relative overflow-hidden cursor-pointer group" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}>
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
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-text/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" /></svg>
                </div>
              </div>
            ))}
          </div>

          {/* Full-width banner image */}
          <div className="proj-banner-wrap" style={{ marginBottom: "clamp(3rem, 6vw, 4rem)" }}>
            <div className="proj-banner relative w-full overflow-hidden" style={{ aspectRatio: "21/9" }}>
              <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url(/photo-1583847268964-b28dc8f51f92.avif)", height: "130%", top: "-15%" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-2/70 via-transparent to-bg-2/70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="t-label text-accent tracking-[0.4em] block" style={{ marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}>FEATURED PROJECT</span>
                  <h3 className="t-h2 text-text">Nordic Spa House</h3>
                  <p className="text-sm text-text-30 mt-2">Stockholm, Sweden — 2024</p>
                </div>
              </div>
              <div className="absolute inset-0 border border-text-08" style={{ margin: "clamp(1rem, 2vw, 1.5rem)" }} />
            </div>
          </div>

          {/* Project cards - remaining */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(3rem, 6vw, 4rem)" }}>
            {projects.slice(2).map((p, i) => (
              <div key={i + 2} className="proj-card relative overflow-hidden cursor-pointer group" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}>
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
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-text/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" /></svg>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom accent images */}
          <div className="proj-bottom-images flex items-center justify-center" style={{ marginTop: "clamp(8rem, 16vw, 16rem)", gap: "clamp(2rem, 4vw, 4rem)" }}>
            <div className="proj-bottom-img rounded-lg overflow-hidden border border-text-08" style={{ width: "clamp(90px, 12vw, 150px)", height: "clamp(90px, 12vw, 150px)" }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/premium_photo-1681113076872-c74b8926e70c.avif)" }} />
            </div>
            <div className="proj-bottom-img rounded-lg overflow-hidden border border-text-08" style={{ width: "clamp(110px, 15vw, 190px)", height: "clamp(110px, 15vw, 190px)" }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/premium_photo-1670360414483-64e6d9ba9038.avif)" }} />
            </div>
            <div className="proj-bottom-img rounded-lg overflow-hidden border border-text-08" style={{ width: "clamp(90px, 12vw, 150px)", height: "clamp(90px, 12vw, 150px)" }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1618220179428-22790b461013.avif)" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
    </section>
  );
}
