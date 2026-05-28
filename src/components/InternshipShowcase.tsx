import React, { useEffect, useRef } from "react";
import { Code2, Check } from "lucide-react";
import { internshipStages } from "../config/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function InternshipShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Create the GSAP timeline linked to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=2000", // Length of pinning scroll
        pin: true,
        scrub: 1, // Smooth scrub
        anticipatePin: 1,
      }
    });

    // We animate Stages 2 and 3 entering and Stages 1 and 2 exiting
    // Initially, Stage 1 is active, others are pre-positioned off-screen
    
    // Stage 1 -> Stage 2 transition
    tl.to(".stage-1-item", {
      opacity: 0,
      y: -80,
      duration: 1,
      ease: "power2.inOut"
    })
    .fromTo(".stage-2-item", 
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" },
      "-=0.7" // overlap slightly
    )
    
    // Stage 2 -> Stage 3 transition
    .to(".stage-2-item", {
      opacity: 0,
      y: -80,
      duration: 1,
      ease: "power2.inOut"
    })
    .fromTo(".stage-3-item", 
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" },
      "-=0.7"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) trigger.kill();
      });
    };
  }, []);

  // Helpers to render the custom visual SVG/CSS placeholders for each stage
  const renderPlaceholder = (type: string) => {
    switch (type) {
      case "microfluidics":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-white border border-slate-200/40 rounded-xl">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:20px_20px] opacity-80" />
            
            <div className="w-full max-w-xs space-y-4 z-10 font-sans-data text-[10px]">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-700">
                <span className="uppercase tracking-wider">Microfluidic Node A</span>
                <span className="text-emerald-600 font-bold">● LAMINAR_FLOW</span>
              </div>
              
              {/* SVG channel schematic */}
              <svg viewBox="0 0 200 80" className="w-full h-20 opacity-90">
                {/* Channel walls */}
                <path d="M 10 20 L 80 20 L 120 35 L 190 35" stroke="rgba(0,0,0,0.04)" strokeWidth="8" fill="none" />
                <path d="M 10 60 L 80 60 L 120 45 L 190 45" stroke="rgba(0,0,0,0.04)" strokeWidth="8" fill="none" />
                
                {/* Fluid streams */}
                <path d="M 10 20 L 80 20 L 120 35 L 190 35" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" fill="none" className="opacity-80" />
                <path d="M 10 60 L 80 60 L 120 45 L 190 45" stroke="#059669" strokeWidth="2" strokeLinecap="round" fill="none" className="opacity-80" />
                
                {/* Convergence zone */}
                <circle cx="120" cy="40" r="4" fill="#059669" className="animate-pulse" />
              </svg>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 rounded bg-slate-50 border border-slate-200/50 text-center text-slate-500">
                  Inflow: 1.2 μL/s
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200/50 text-center text-slate-500">
                  Reynolds No: 0.04
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 text-[8px] font-sans-data uppercase tracking-wider text-slate-400">
              FLUID_DYNAMICS_GRID: L2_RUN
            </div>
          </div>
        );
      case "spectrometry":
        return (
          <div className="w-full h-full flex flex-col justify-start p-6 bg-white border border-slate-200/40 rounded-xl relative overflow-hidden font-sans-data text-[10px] leading-relaxed text-slate-700">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500/60" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-slate-400 uppercase tracking-widest text-[9px]">Spectrograph_Calibration_Waveform</span>
            </div>
            
            <div className="relative h-28 w-full border-b border-l border-slate-100 flex items-end">
              {/* Simulated spectral wavelengths */}
              <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                <path 
                  d="M 0 80 Q 30 80 50 20 T 90 90 T 130 50 T 170 90 T 200 90" 
                  fill="none" 
                  stroke="#2563eb" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                />
                <path 
                  d="M 0 90 Q 25 90 45 40 T 85 95 T 125 70 T 165 95 T 200 95" 
                  fill="none" 
                  stroke="#059669" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  className="opacity-50"
                />
                {/* Target line */}
                <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(239, 68, 68, 0.15)" strokeDasharray="3 3" />
              </svg>
            </div>
            
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[8px] text-slate-400">
              <Code2 className="w-3 h-3 text-blue-500" />
              <span className="uppercase tracking-widest">SPECTROMETRIC_STABILITY: 0.04nm</span>
            </div>
          </div>
        );
      case "telemetry":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white border border-slate-200/40 rounded-xl relative overflow-hidden">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg width="110" height="110" className="rotate-[-90deg]">
                <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="6" />
                <circle 
                  cx="55" 
                  cy="55" 
                  r="46" 
                  fill="none" 
                  stroke="#059669" 
                  strokeWidth="6" 
                  strokeDasharray={2 * Math.PI * 46} 
                  strokeDashoffset={2 * Math.PI * 46 * (1 - 0.998)} 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-display text-2xl font-bold text-slate-900">99.8%</span>
                <span className="text-[8px] text-slate-400 uppercase tracking-widest font-sans-data mt-0.5">Sensor Sync</span>
              </div>
            </div>
            
            <div className="mt-6 flex items-center gap-1.5 text-[9px] text-emerald-600 font-sans-data uppercase tracking-wider">
              <Check className="w-3 h-3" />
              <span>SENSOR_TELEMETRY: SYNC_COMPLETE</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative h-screen w-full flex items-center justify-center bg-canvas-light overflow-hidden"
    >
      <div className="w-full max-w-6xl h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 relative">
        
        {/* Left Column - Graphic/Illustration Side */}
        <div className="lg:col-span-5 relative w-full h-[300px] md:h-[400px]">
          
          {/* Stage 1 Picture Frame */}
          <div className="stage-1-item absolute inset-0 w-full h-full transition-opacity duration-300">
            <div className="w-full h-full p-4 glass-card rounded-2xl border border-slate-200/50 flex items-center justify-center relative shadow-sm">
              {renderPlaceholder("microfluidics")}
            </div>
          </div>

          {/* Stage 2 Picture Frame */}
          <div className="stage-2-item absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 pointer-events-none">
            <div className="w-full h-full p-4 glass-card rounded-2xl border border-slate-200/50 flex items-center justify-center relative shadow-sm">
              {renderPlaceholder("spectrometry")}
            </div>
          </div>

          {/* Stage 3 Picture Frame */}
          <div className="stage-3-item absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 pointer-events-none">
            <div className="w-full h-full p-4 glass-card rounded-2xl border border-slate-200/50 flex items-center justify-center relative shadow-sm">
              {renderPlaceholder("telemetry")}
            </div>
          </div>

        </div>

        {/* Right Column - Text Description Side */}
        <div className="lg:col-span-7 relative w-full h-[350px] md:h-[400px] flex items-center">
          
          {/* Stage 1 Narrative */}
          <div className="stage-1-item absolute inset-0 w-full h-full flex flex-col justify-center space-y-4 text-left transition-opacity duration-300">
            <span className="text-[10px] font-sans-data font-bold tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-500/20 px-3 py-1 rounded-lg w-fit">
              STAGE 01 / SPECIFICATION
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {internshipStages[0].title}
            </h3>
            <h4 className="text-xs font-sans-data font-semibold uppercase tracking-wider text-slate-500">
              {internshipStages[0].subtitle}
            </h4>
            <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
              {internshipStages[0].narrative}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {internshipStages[0].tools.map((t, i) => (
                <span key={i} className="text-[10px] font-sans-data uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Stage 2 Narrative */}
          <div className="stage-2-item absolute inset-0 w-full h-full flex flex-col justify-center space-y-4 text-left transition-opacity duration-300 opacity-0 pointer-events-none">
            <span className="text-[10px] font-sans-data font-bold tracking-widest text-blue-700 bg-blue-50 border border-blue-500/20 px-3 py-1 rounded-lg w-fit">
              STAGE 02 / CALIBRATION
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {internshipStages[1].title}
            </h3>
            <h4 className="text-xs font-sans-data font-semibold uppercase tracking-wider text-slate-500">
              {internshipStages[1].subtitle}
            </h4>
            <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
              {internshipStages[1].narrative}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {internshipStages[1].tools.map((t, i) => (
                <span key={i} className="text-[10px] font-sans-data uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Stage 3 Narrative */}
          <div className="stage-3-item absolute inset-0 w-full h-full flex flex-col justify-center space-y-4 text-left transition-opacity duration-300 opacity-0 pointer-events-none">
            <span className="text-[10px] font-sans-data font-bold tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-500/20 px-3 py-1 rounded-lg w-fit">
              STAGE 03 / CALIBRATION RESULTS
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {internshipStages[2].title}
            </h3>
            <h4 className="text-xs font-sans-data font-semibold uppercase tracking-wider text-slate-500">
              {internshipStages[2].subtitle}
            </h4>
            <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
              {internshipStages[2].narrative}
            </p>
            
            {/* Impact Metric Widget */}
            {internshipStages[2].metricLabel && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-500/15 w-fit flex items-center gap-4 shadow-sm">
                <div className="text-lg md:text-xl font-bold text-emerald-700 font-sans-data">
                  {internshipStages[2].metricValue}
                </div>
                <div className="text-[10px] text-slate-500 font-sans-data uppercase tracking-wider leading-tight">
                  {internshipStages[2].metricLabel}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {internshipStages[2].tools.map((t, i) => (
                <span key={i} className="text-[10px] font-sans-data uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg">
                  {t}
                </span>
              ))}
            </div>
          </div>

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
