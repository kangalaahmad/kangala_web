"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export let lenisInstance: Lenis | null = null;

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    lenisInstance = lenis;

    return () => {
      cancelAnimationFrame(rafId); // ← Fix: stop the loop before destroy
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
