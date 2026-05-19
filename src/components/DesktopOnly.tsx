"use client";

import { useState, useEffect } from "react";

export default function DesktopOnly({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      document.body.style.overflow = desktop ? "" : "hidden";
    };
    check();
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isDesktop) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#faf8f5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <div style={{ width: "64px", height: "1px", background: "#8b6914", marginBottom: "2rem" }} />
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 5vw, 2rem)", color: "#1a1a1a", marginBottom: "1.5rem", fontWeight: 400 }}>
          Desktop Experience
        </h1>
        <p style={{ color: "rgba(26,26,26,0.55)", maxWidth: "24rem", marginBottom: "2.5rem", lineHeight: 1.8, fontSize: "0.95rem" }}>
          This site is designed for desktop and laptop screens. Please view on a larger device for the full experience.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(26,26,26,0.3)", fontSize: "0.8rem" }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
          <span>Best viewed at 1024px and above</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
