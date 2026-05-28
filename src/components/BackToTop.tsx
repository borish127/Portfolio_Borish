import React, { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Only run on client-side
    gsap.registerPlugin(ScrollTrigger);

    const button = buttonRef.current;
    if (!button) return;

    // Set initial hidden state
    gsap.set(button, {
      opacity: 0,
      visibility: "hidden",
      y: 20
    });

    // Create scroll trigger to fade button in/out
    const trigger = ScrollTrigger.create({
      trigger: "#education", // Appears as we enter the education block (past the hero fold)
      start: "top 80%",
      onEnter: () => {
        gsap.to(button, {
          opacity: 1,
          visibility: "visible",
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      },
      onLeaveBack: () => {
        gsap.to(button, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power2.in",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(button, { visibility: "hidden" });
          }
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass-pill border border-emerald-500/20 text-emerald-600 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-sm"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
