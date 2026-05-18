"use client";

import SmoothScroll from "@/components/SmoothScroll";
import RawNav from "@/components/RawNav";
import RawHero from "@/components/RawHero";
import RawPhilosophy from "@/components/RawPhilosophy";
import RawDifference from "@/components/RawDifference";
import RawCollection from "@/components/RawCollection";
import RawProcess from "@/components/RawProcess";
import RawTestimonials from "@/components/RawTestimonials";
import RawProjects from "@/components/RawProjects";
import RawCta from "@/components/RawCta";
import RawFooter from "@/components/RawFooter";

export default function Home() {
  return (
    <SmoothScroll>
      <RawNav />
      <main>
        <RawHero />
        <RawPhilosophy />
        <RawDifference />
        <RawCollection />
        <RawProcess />
        <RawTestimonials />
        <RawProjects />
        <RawCta />
        <RawFooter />
      </main>
    </SmoothScroll>
  );
}
