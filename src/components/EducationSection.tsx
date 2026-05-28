import React, { useEffect, useRef } from "react";
import { GraduationCap, Calendar, CheckCircle2 } from "lucide-react";
import { educationData } from "../config/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".edu-card");
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Animates when top of section is 80% down the viewport
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-4xl z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-sans-data font-bold uppercase tracking-widest text-emerald-600">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Curriculum Vitae
          </h2>
          <div className="w-12 h-[1px] bg-emerald-500/40 mx-auto" />
        </div>

        {/* Timeline Blocks */}
        <div className="relative border-l border-slate-200 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {educationData.map((item, idx) => (
            <div 
              key={idx} 
              className="edu-card gpu-accelerated relative"
            >
              {/* Timeline dot icon */}
              <div className="absolute -left-[49px] md:-left-[65px] top-2.5 w-8 h-8 rounded-xl bg-white border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                <GraduationCap className="w-4 h-4" />
              </div>

              {/* Glassmorphic block */}
              <div className="glass-card accent-border-green-hover rounded-2xl p-6 md:p-8 space-y-4 border border-slate-200/50 transition-all duration-300">
                
                {/* Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">
                      {item.institution}
                    </h3>
                    <p className="text-xs font-sans-data font-semibold uppercase tracking-wider text-emerald-600 mt-1">
                      {item.degree}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100/50 border border-slate-200/50 text-slate-500 text-[10px] font-sans-data uppercase tracking-wider">
                    <Calendar className="w-3 h-3" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2.5 pt-2">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-3 text-slate-600 text-sm md:text-base font-light leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600/60 mt-1 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
