import React, { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { internshipStages } from "../config/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function InternshipShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Create the GSAP timeline linked to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=1200", // Length of pinning scroll (tighter/faster)
        pin: true,
        scrub: 0.5, // More responsive scroll tracking
        anticipatePin: 1,
        snap: {
          snapTo: [0, 0.33, 0.67, 1.0],
          duration: { min: 0.3, max: 0.7 }, // Coasting duration
          delay: 0.0, // Instantly transitions to snap
          ease: "power2.out" // Deceleration ease mimicking friction/inertia
        }
      }
    });

    // Stage 1 -> Stage 2 transition
    tl.to(".stage-1-item", {
      opacity: 0,
      y: -80,
      pointerEvents: "none",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(container, {
      backgroundColor: "#f0fdf4", // Soft emerald tint
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .to(".showcase-blob-green", {
      opacity: 1,
      scale: 1.3,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .fromTo(".stage-2-item", 
      { opacity: 0, y: 80, pointerEvents: "none" },
      { opacity: 1, y: 0, pointerEvents: "auto", duration: 1, ease: "power2.inOut" },
      "-=0.7" // overlap slightly
    )
    
    // Stage 2 -> Stage 3 transition
    .to(".stage-2-item", {
      opacity: 0,
      y: -80,
      pointerEvents: "none",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(container, {
      backgroundColor: "#f0f9ff", // Soft blue tint
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .to(".showcase-blob-green", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .to(".showcase-blob-blue", {
      opacity: 1,
      scale: 1.3,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .fromTo(".stage-3-item", 
      { opacity: 0, y: 80, pointerEvents: "none" },
      { opacity: 1, y: 0, pointerEvents: "auto", duration: 1, ease: "power2.inOut" },
      "-=0.7"
    )

    // Stage 3 -> Stage 4 transition
    .to(".stage-3-item", {
      opacity: 0,
      y: -80,
      pointerEvents: "none",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(container, {
      backgroundColor: "#fdfaf3", // Soft warm amber tint
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .to(".showcase-blob-blue", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .to(".showcase-blob-orange", {
      opacity: 1,
      scale: 1.3,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .fromTo(".stage-4-item", 
      { opacity: 0, y: 80, pointerEvents: "none" },
      { opacity: 1, y: 0, pointerEvents: "auto", duration: 1, ease: "power2.inOut" },
      "-=0.7"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) trigger.kill();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative h-screen w-full flex items-center justify-center bg-canvas-light overflow-hidden"
    >
      {/* Local Section background blobs for pinning cues */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="showcase-blob-green absolute top-1/2 left-1/4 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-emerald-500/10 blur-[100px] opacity-0 transition-opacity duration-300" />
        <div className="showcase-blob-blue absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-blue-500/8 blur-[100px] opacity-0 transition-opacity duration-300" />
        <div className="showcase-blob-orange absolute top-1/2 left-1/3 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-amber-500/8 blur-[100px] opacity-0 transition-opacity duration-300" />
      </div>

      <div className="w-full max-w-6xl h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 relative z-10">

        {/* Left Column - Graphic/Illustration Side */}
        <div className="lg:col-span-5 relative w-full h-[300px] md:h-[400px]">
          {internshipStages.map((stage, idx) => {
            const stageNum = idx + 1;
            const isFirst = idx === 0;
            return (
              <div 
                key={idx}
                className={`stage-${stageNum}-item absolute inset-0 w-full h-full ${
                  isFirst ? "" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="w-full h-full p-4 glass-card rounded-2xl border border-slate-200/50 flex items-center justify-center relative shadow-sm">
                  {/* Render 2 images inside this stage frame (columns or rows layout depending on config) */}
                  <div className={`w-full h-full grid gap-3 relative select-none ${
                    stage.imageLayout === "rows" ? "grid-rows-2" : "grid-cols-2"
                  }`}>
                    {stage.images && stage.images.map((imgSrc, imgIdx) => (
                      <div key={imgIdx} className="w-full h-full rounded-xl bg-slate-50 border border-slate-200/40 relative overflow-hidden group/img shadow-sm flex items-center justify-center">
                        <img 
                          src={imgSrc} 
                          alt={`${stage.title} visual ${imgIdx + 1}`} 
                          className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out z-10"
                          onError={(e) => {
                            // Hide broken image link visual
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        {/* Elegant fallback placeholder visual */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50 text-[10px] text-slate-400 font-sans-data">
                          <span className="font-semibold uppercase tracking-widest text-[8px] text-slate-400 opacity-60">Visual {imgIdx + 1}</span>
                          <span className="text-[7px] text-slate-400 mt-1 uppercase font-mono break-all px-2">{imgSrc.split('/').pop()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column - Text Description Side */}
        <div className="lg:col-span-7 relative w-full h-[350px] md:h-[400px] flex items-center">
          {internshipStages.map((stage, idx) => {
            const stageNum = idx + 1;
            const isFirst = idx === 0;
            const isStage4 = stageNum === 4;
            const badgeColor = 
              stageNum === 1 ? "text-emerald-700 bg-emerald-50 border border-emerald-500/20" :
              stageNum === 2 ? "text-blue-700 bg-blue-50 border border-blue-500/20" :
              stageNum === 3 ? "text-emerald-700 bg-emerald-50 border border-emerald-500/20" :
              "text-amber-700 bg-amber-50 border border-amber-500/20";
            return (
              <div 
                key={idx}
                className={`stage-${stageNum}-item absolute inset-0 w-full h-full flex flex-col justify-center space-y-4 text-left ${
                  isFirst ? "" : "opacity-0 pointer-events-none"
                }`}
              >
                <span className={`text-[10px] font-sans-data font-bold tracking-widest px-3 py-1 rounded-lg w-fit ${badgeColor}`}>
                  {isStage4 ? "MISCELLANEOUS" : `PROJECT 0${stageNum}`}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                  {stage.title}
                </h3>
                <h4 className="text-xs font-sans-data font-semibold uppercase tracking-wider text-slate-500">
                  {stage.subtitle}
                </h4>
                <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
                  {stage.narrative}
                </p>

                {/* Impact Metric Widget (if defined in config) */}
                {stage.metricLabel && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-500/15 w-fit flex items-center gap-4 shadow-sm">
                    <div className="text-lg md:text-xl font-bold text-emerald-700 font-sans-data">
                      {stage.metricValue}
                    </div>
                    <div className="text-[10px] text-slate-500 font-sans-data uppercase tracking-wider leading-tight">
                      {stage.metricLabel}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {stage.tools.map((t, i) => (
                    <span key={i} className="text-[10px] font-sans-data uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Scroll indicator overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-[8px] font-sans-data tracking-widest text-slate-400 uppercase">Scroll to Advance</span>
        <div className="w-1.5 h-6 rounded-full bg-slate-200 flex justify-center p-0.5">
          <div className="w-0.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
