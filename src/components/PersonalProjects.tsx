import React, { useEffect, useRef } from "react";
import { Github, Folder, Layout, Terminal as TermIcon, Smartphone } from "lucide-react";
import { personalProjects } from "../config/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PersonalProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const magneticRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Text slide-in entrances per row
    rowRefs.current.forEach((row, idx) => {
      if (!row) return;

      const isEven = idx % 2 === 0;
      const textCol = row.querySelector(".project-text-col");
      const imageCol = row.querySelector(".project-image-col");

      if (textCol) {
        // Slide text in from right if even (since text is on right), or left if odd (text is on left)
        const xOffset = isEven ? 80 : -80;
        gsap.fromTo(
          textCol,
          { opacity: 0, x: xOffset },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

    // 2. Parallax vertical speed scroll trigger on images
    imageRefs.current.forEach((imageContainer, idx) => {
      if (!imageContainer) return;
      const row = rowRefs.current[idx];
      if (!row) return;

      gsap.fromTo(
        imageContainer,
        { y: 35 },
        {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1 // Smooth scroll tracking
          }
        }
      );
    });

    // 3. Magnetic Hover Button Interaction
    magneticRefs.current.forEach((button) => {
      if (!button) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        // Apply magnetic attraction coordinates (damping multiplier: 0.35)
        gsap.to(button, {
          x: mouseX * 0.35,
          y: mouseY * 0.35,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      const handleMouseLeave = () => {
        // Reset to original center coordinates
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1.1, 0.4)",
          overwrite: "auto"
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Helpers to render mock graphics for personal projects
  const renderProjectGraphic = (type: string) => {
    switch (type) {
      case "telemetry":
        return (
          <div className="w-full h-full flex flex-col p-4 bg-slate-50 border border-slate-200/60 rounded-xl relative overflow-hidden select-none">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
              <Layout className="w-4 h-4 text-emerald-600" />
              <span className="text-[9px] font-sans-data uppercase tracking-widest text-slate-500">Bioreactor Environmental Telemetry</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 h-full">
              <div className="col-span-2 p-3 bg-white border border-slate-200/60 rounded-lg flex flex-col justify-between font-sans-data text-[9px]">
                <span className="text-[8px] text-slate-400 uppercase tracking-wider">DO Saturation Plot</span>
                <div className="flex items-end gap-1.5 h-16 pt-2">
                  <div className="w-full h-[40%] bg-emerald-600/20 rounded-sm" />
                  <div className="w-full h-[65%] bg-emerald-600/35 rounded-sm" />
                  <div className="w-full h-[55%] bg-emerald-600/50 rounded-sm" />
                  <div className="w-full h-[92%] bg-emerald-600 rounded-sm" />
                </div>
              </div>
              <div className="p-3 bg-white border border-slate-200/60 rounded-lg flex flex-col justify-between font-sans-data text-[9px]">
                <span className="text-[8px] text-slate-400 uppercase tracking-wider">pH level</span>
                <div className="w-10 h-10 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center mx-auto text-emerald-600 text-xs font-semibold">
                  7.4
                </div>
              </div>
            </div>
          </div>
        );
      case "structure":
        return (
          <div className="w-full h-full flex flex-col p-4 bg-slate-50 border border-slate-200/60 rounded-xl relative overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3 text-slate-450 text-[8px] font-sans-data uppercase tracking-wider">
              <span>pdb_molecular_parser</span>
              <span>Render: WebGL</span>
            </div>
            
            <div className="flex items-center justify-center h-28 relative">
              {/* Double helix representation */}
              <svg viewBox="0 0 100 60" className="w-24 h-16 opacity-85">
                <path d="M 10 30 Q 30 10 50 30 T 90 30" fill="none" stroke="#1d4ed8" strokeWidth="2" />
                <path d="M 10 30 Q 30 50 50 30 T 90 30" fill="none" stroke="#059669" strokeWidth="2" />
                {/* Connecting rungs */}
                <line x1="22" y1="20" x2="22" y2="40" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="38" y1="23" x2="38" y2="37" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="62" y1="37" x2="62" y2="23" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="78" y1="40" x2="78" y2="20" stroke="#cbd5e1" strokeWidth="1.5" />
              </svg>
              
              <div className="absolute bottom-1 left-2 text-[8px] font-sans-data uppercase tracking-wider text-slate-400">
                Structure: 1A2B.pdb (Ready)
              </div>
            </div>
          </div>
        );
      case "signal":
        return (
          <div className="w-full h-full flex justify-center items-center p-4">
            <div className="w-[140px] h-[220px] rounded-xl bg-white border border-slate-200 flex flex-col relative overflow-hidden select-none shadow-md">
              {/* Thin status border */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 text-[7px] text-slate-400 font-sans-data uppercase tracking-wider">
                <span>Biosensor</span>
                <span>Active</span>
              </div>
              
              <div className="p-3 space-y-3 text-left h-full flex flex-col justify-center font-sans-data">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <h4 className="text-[10px] font-bold text-slate-900 leading-tight">ECG Simulator</h4>
                
                {/* ECG Waveform SVG */}
                <svg viewBox="0 0 100 40" className="w-full h-10 overflow-visible">
                  <path 
                    d="M 0 20 L 25 20 L 30 10 L 35 30 L 40 20 L 60 20 L 65 5 L 70 35 L 75 20 L 100 20" 
                    fill="none" 
                    stroke="#dc2626" 
                    strokeWidth="1.5"
                    className="opacity-85"
                  />
                </svg>
                
                <div className="w-full py-1.5 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[7px] text-slate-500 uppercase tracking-widest">
                  BP_SYNC: 72 BPM
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-6xl z-10 space-y-20">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-sans-data font-bold uppercase tracking-widest text-emerald-600">
            Research Implementations
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Instrumentation Projects
          </h2>
          <div className="w-12 h-[1px] bg-emerald-500/40 mx-auto" />
        </div>

        {/* Rows Sequence */}
        <div className="space-y-24 md:space-y-36">
          {personalProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                ref={(el) => { rowRefs.current[idx] = el; }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left"
              >
                
                {/* Image Column */}
                <div
                  className={`lg:col-span-6 flex justify-center project-image-col ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div
                    ref={(el) => { imageRefs.current[idx] = el; }}
                    className="gpu-accelerated glass-card w-full max-w-md h-[280px] md:h-[350px] rounded-2xl p-5 border border-slate-200/50 accent-border-green-hover relative overflow-hidden group select-none flex items-center justify-center cursor-default transition-colors duration-300"
                  >
                    {/* Inner image scale zoom trigger */}
                    <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                      {renderProjectGraphic(project.placeholderType)}
                    </div>
                  </div>
                </div>

                {/* Text Column */}
                <div
                  className={`lg:col-span-6 space-y-6 project-text-col ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/40 text-emerald-600">
                      <Folder className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technical Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-sans-data uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Magnetic GitHub Pill Button */}
                  <div className="pt-2 flex">
                    <a
                      ref={(el) => { magneticRefs.current[idx] = el; }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gpu-accelerated inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-600/30 text-emerald-600 hover:bg-emerald-600/5 hover:border-emerald-600/60 text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Repository</span>
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
