import React, { useEffect, useRef } from "react";
import { Cpu, Music, Terminal, Zap, Languages } from "lucide-react";
import { skillsData } from "../config/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Staggered card fade-in & slide up
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Sequential back-out stagger for individual technical skill tag pills
      gsap.fromTo(
        ".skill-tag",
        { opacity: 0, scale: 0.8, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".skills-tech-card",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Staggered reveal for language rows
      gsap.fromTo(
        ".lang-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-lang-card",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Helper to render icon based on config string
  const renderInterestIcon = (name: string) => {
    switch (name) {
      case "zap":
        return <Zap className="w-5 h-5 text-amber-600" />;
      case "music":
        return <Music className="w-5 h-5 text-blue-600" />;
      case "terminal":
        return <Terminal className="w-5 h-5 text-emerald-600" />;
      default:
        return <Cpu className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 flex items-center justify-center bg-slate-50/30 overflow-hidden"
    >
      <div className="w-full max-w-5xl z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-sans-data font-bold uppercase tracking-widest text-emerald-600">
            Expertise & Hobbies
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Skills & Interests
          </h2>
          <div className="w-12 h-[1px] bg-emerald-500/40 mx-auto" />
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Technical Skills & Languages (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Technical Skills Card */}
            <div 
              ref={(el) => { cardRefs.current[0] = el; }}
              className="skills-tech-card glass-card p-6 border border-slate-200/50 space-y-5 text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span>Technical Skills</span>
              </h3>
              
              <div className="flex flex-wrap gap-2.5">
                {skillsData.technical.map((skill, idx) => (
                  <span
                    key={idx}
                    className="skill-tag text-[11px] font-sans-data font-medium tracking-wide bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg shadow-sm hover:border-emerald-500/30 hover:bg-emerald-50/10 transition-colors duration-200 inline-block"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages Card */}
            <div 
              ref={(el) => { cardRefs.current[1] = el; }}
              className="skills-lang-card glass-card p-6 border border-slate-200/50 space-y-4 text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Languages className="w-4 h-4 text-blue-600" />
                <span>Languages</span>
              </h3>
              
              <div className="space-y-3 font-sans-data">
                {skillsData.languages.map((lang, idx) => (
                  <div key={idx} className="lang-item flex justify-between items-center bg-white/50 border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm">
                    <span className="text-xs font-semibold text-slate-800">{lang.language}</span>
                    <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase bg-emerald-50 px-2 py-1 rounded-md border border-emerald-500/10">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interests & Hobbies (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {skillsData.interests.map((interest, idx) => (
              <div
                key={idx}
                ref={(el) => { cardRefs.current[idx + 2] = el; }}
                className="gpu-accelerated glass-card p-6 border border-slate-200/50 flex flex-col md:flex-row gap-4 items-start text-left group hover:-translate-y-1 hover:shadow-md hover:border-emerald-500/30 hover:bg-white/60 transition-all duration-300 shadow-sm"
              >
                <div className="p-3 bg-white border border-slate-200/40 rounded-xl shadow-inner shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                  {renderInterestIcon(interest.iconName)}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 font-sans-data">
                    {interest.title}
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
