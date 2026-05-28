import React, { useEffect, useRef } from "react";
import { Briefcase, Calendar, Terminal, Check } from "lucide-react";
import { currentWorkData } from "../config/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CurrentWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Staggered slide up for all paragraphs and items inside current work
      gsap.fromTo(
        ".work-fade",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%", // Triggers when top of section is 75% down viewport
            toggleActions: "play none none none"
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="current-work"
      className="relative min-h-screen py-24 px-6 flex items-center justify-center bg-slate-50/50"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Structured Job Details */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="work-fade space-y-2">
            <div className="flex items-center gap-2 text-xs font-sans-data font-bold tracking-widest text-emerald-600">
              <Briefcase className="w-3.5 h-3.5" />
              <span>ACTIVE ENGAGEMENT</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {currentWorkData.company}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <span className="text-slate-700 font-semibold">{currentWorkData.role}</span>
              <span>•</span>
              <span className="font-sans-data text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {currentWorkData.period}
              </span>
            </div>
          </div>

          <p className="work-fade text-slate-600 text-sm md:text-base font-light leading-relaxed">
            {currentWorkData.description}
          </p>

          {/* Staggered Bullet List */}
          <ul className="space-y-4 pt-2">
            {currentWorkData.bullets.map((bullet, idx) => (
              <li 
                key={idx}
                className="work-fade flex items-start gap-3.5 text-slate-600 text-sm md:text-base font-light leading-relaxed"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

        </div>

        {/* Right Column: Visual Dashboard/Workspace Simulation */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="work-fade gpu-accelerated glass-card w-full max-w-sm rounded-2xl p-5 border border-slate-200/50 accent-border-blue-hover relative overflow-hidden select-none transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/40" />
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <span className="text-[9px] font-sans-data text-slate-500 uppercase tracking-widest">bioreactor_telemetry</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            </div>

            {/* Simulated Live Interface Metrics */}
            <div className="space-y-4 font-sans-data text-[10px]">
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-slate-500 uppercase tracking-wider">
                  <span>Dissolved Oxygen (DO)</span>
                  <span className="text-emerald-600 font-bold">94% (Stable)</span>
                </div>
                <div className="w-full h-1 rounded-full bg-slate-200/60 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "94%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-slate-500 uppercase tracking-wider">
                  <span>pH Level</span>
                  <span className="text-blue-600 font-bold">7.41 pH</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200/60 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "74%" }} />
                </div>
              </div>

              {/* Pseudo telemetry logs */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-[9px] text-slate-600 space-y-1">
                <p className="text-blue-600">&gt; start_bioreactor_sensor_poll</p>
                <p className="text-slate-400">Establishing telemetry feed: ws://instrument.local</p>
                <p className="text-emerald-600 font-medium">DO feedback loop active | Calibration: 100%</p>
                <p className="text-slate-400">Stream: 100Hz | Temp: 37.0°C | Vol: 2.5L</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
