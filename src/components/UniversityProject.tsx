import React, { useRef, useEffect } from "react";
import { FileText, ExternalLink } from "lucide-react";
import { universityProject } from "../config/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function UniversityProject() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll reveal entry
    gsap.registerPlugin(ScrollTrigger);
    
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Set CSS custom properties for the radial glow highlight
    card.style.setProperty("--mouse-x", `${mouseX}px`);
    card.style.setProperty("--mouse-y", `${mouseY}px`);

    // Calculate rotation (-0.5 to 0.5 range)
    const xPct = (mouseX - width / 2) / width;
    const yPct = (mouseY - height / 2) / height;

    const maxRotation = 10; // Degrees
    const rotateX = -yPct * maxRotation;
    const rotateY = xPct * maxRotation;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Reset rotation smoothly
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <section
      ref={containerRef}
      id="thesis"
      className="relative min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden"
      style={{ perspective: 1000 }}
    >
      <div className="w-full max-w-4xl z-10 space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-sans-data font-bold uppercase tracking-widest text-blue-600">
            Capstone & Research
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            University Final Project
          </h2>
          <div className="w-12 h-[1px] bg-blue-500/40 mx-auto" />
        </div>

        {/* High Focus Isolated Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="gpu-accelerated glass-card rounded-2xl p-8 md:p-12 border border-slate-200/50 hover:border-blue-500/30 shadow-2xl relative overflow-hidden group select-none text-left transition-colors duration-300"
          style={{
            transformStyle: "preserve-3d",
            // Fallback default coordinates for CSS mouse variables
            background: "radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, 0.05), transparent 80%), var(--color-glass-bg)"
          }}
        >
          {/* Border glowing hover outline */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), rgba(37, 99, 235, 0.06), transparent 80%)"
            }}
          />

          <div className="space-y-6 relative z-10">
            
            {/* Header with Icon */}
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200/40 text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] font-sans-data font-bold text-slate-500 uppercase tracking-widest">
                  Graduate Thesis
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  {universityProject.title}
                </h3>
              </div>
            </div>

            {/* Subtitle */}
            <h4 className="text-xs font-sans-data font-bold uppercase tracking-wider text-emerald-600">
              {universityProject.subtitle}
            </h4>

            {/* Abstract */}
            <div className="space-y-2">
              <span className="text-[9px] font-sans-data font-bold tracking-widest text-slate-500 uppercase">
                Abstract
              </span>
              <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
                {universityProject.abstract}
              </p>
            </div>

            {/* Technical Tags */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {universityProject.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="text-[10px] font-sans-data uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Document Link */}
            {universityProject.paperUrl && (
              <div className="pt-4 flex">
                <a
                  href={universityProject.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gpu-accelerated inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg border border-blue-600/30 text-blue-600 hover:bg-blue-600/5 hover:border-blue-600/60 text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  <span>Read Research Paper</span>
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                </a>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
