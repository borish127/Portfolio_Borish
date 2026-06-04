import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { internshipStages } from "../config/portfolio";

export default function InternshipShowcase() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextStage = () => {
    if (currentIdx < internshipStages.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const prevStage = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  // Keyboard navigation inside viewport
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Only navigate if the section is visible in the viewport
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;

      if (e.key === "ArrowLeft") {
        prevStage();
      } else if (e.key === "ArrowRight") {
        nextStage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIdx]);

  // Mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // minimum swipe distance in pixels
    if (diffX > minSwipeDistance) {
      nextStage();
    } else if (diffX < -minSwipeDistance) {
      prevStage();
    }
  };

  const bgColors = [
    "bg-canvas-light",
    "bg-[#f0fdf4]/50",
    "bg-[#f0f9ff]/50",
    "bg-[#fdfaf3]/50",
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative h-[880px] sm:h-[880px] md:h-[920px] lg:h-[700px] w-full flex flex-col items-center justify-start lg:justify-center pt-12 sm:pt-16 lg:pt-0 gap-2 lg:gap-6 transition-colors duration-700 ease-in-out ${bgColors[currentIdx]} overflow-hidden`}
    >
      {/* Local Section background blobs for visual depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-emerald-500/10 blur-[100px] transition-all duration-700 ${currentIdx === 0 ? "opacity-100 scale-125" : "opacity-0 scale-90"
            }`}
        />
        <div
          className={`absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-blue-500/8 blur-[100px] transition-all duration-700 ${currentIdx === 1 ? "opacity-100 scale-125" : "opacity-0 scale-90"
            }`}
        />
        <div
          className={`absolute top-1/2 left-1/3 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-amber-500/8 blur-[100px] transition-all duration-700 ${currentIdx === 2 ? "opacity-100 scale-125" : "opacity-0 scale-90"
            }`}
        />
      </div>

      {/* Section Title - Static & Fixed Position */}
      <div className="text-center space-y-2 z-10 select-none pt-4 lg:pt-0">
        <span className="text-[10px] font-sans-data font-bold uppercase tracking-widest text-emerald-600">
          Professional Experience
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Student Internship
        </h2>
        <div className="w-12 h-[1px] bg-emerald-500/40 mx-auto" />
      </div>

      <div className="w-full max-w-6xl h-auto lg:h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-center px-16 sm:px-20 lg:px-6 py-4 lg:py-0 relative z-10">

        {/* Left Column - Graphic/Illustration Side */}
        <div className="lg:col-span-5 relative w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[400px] order-2 lg:order-1">
          {internshipStages.map((stage, idx) => {
            const isActive = idx === currentIdx;
            const stageNum = idx + 1;
            return (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${isActive
                  ? "opacity-100 translate-x-0 pointer-events-auto z-10"
                  : "opacity-0 pointer-events-none z-0"
                  }`}
                style={{
                  transform: isActive
                    ? "translateX(0)"
                    : idx < currentIdx
                      ? "translateX(-60px)"
                      : "translateX(60px)"
                }}
              >
                <div className="w-full h-full p-4 glass-card border border-slate-200/50 flex items-center justify-center relative shadow-sm">
                  <div className={`w-full h-full grid gap-3 relative select-none ${stage.imageLayout === "rows" ? "grid-rows-2" : "grid-cols-2"
                    }`}>
                    {stage.images && stage.images.map((imgSrc, imgIdx) => {
                      const isProject1SecondImg = stageNum === 1 && imgIdx === 1;
                      return (
                        <div
                          key={imgIdx}
                          className="w-full h-full rounded-xl bg-slate-50 border border-slate-200/40 relative overflow-hidden group/img shadow-sm flex items-center justify-center"
                        >
                          <img
                            src={imgSrc}
                            alt={`${stage.title} visual ${imgIdx + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out z-10 ${isProject1SecondImg
                              ? "object-[center_70%] lg:object-center group-hover/img:scale-105"
                              : "group-hover/img:scale-105"
                              }`}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50 text-[10px] text-slate-400 font-sans-data">
                            <span className="font-semibold uppercase tracking-widest text-[8px] text-slate-400 opacity-60">Visual {imgIdx + 1}</span>
                            <span className="text-[7px] text-slate-400 mt-1 uppercase font-mono break-all px-2">{imgSrc.split('/').pop()}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column - Text Description Side */}
        <div className="lg:col-span-7 relative w-full h-[360px] sm:h-[340px] md:h-[320px] lg:h-[380px] overflow-hidden order-1 lg:order-2">
          {internshipStages.map((stage, idx) => {
            const isActive = idx === currentIdx;
            const stageNum = idx + 1;
            const isStage4 = stageNum === 4;
            const badgeColor =
              stageNum === 1 ? "text-emerald-700 bg-emerald-50 border border-emerald-500/20" :
                stageNum === 2 ? "text-blue-700 bg-blue-50 border border-blue-500/20" :
                  stageNum === 3 ? "text-emerald-700 bg-emerald-50 border border-emerald-500/20" :
                    "text-amber-700 bg-amber-50 border border-amber-500/20";

            return (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full flex flex-col justify-start space-y-4 text-left overflow-y-auto lg:overflow-y-visible pr-2 transition-all duration-500 ease-in-out ${isActive
                  ? "opacity-100 translate-x-0 pointer-events-auto z-10"
                  : "opacity-0 pointer-events-none z-0"
                  }`}
                style={{
                  transform: isActive
                    ? "translateX(0)"
                    : idx < currentIdx
                      ? "translateX(-60px)"
                      : "translateX(60px)"
                }}
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

      {/* Floating Carousel Arrows */}
      {currentIdx > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            prevStage();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full glass-card border border-slate-200/50 text-slate-500 hover:text-emerald-600 hover:border-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
          aria-label="Previous Stage"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 h-6" />
        </button>
      )}

      {currentIdx < internshipStages.length - 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            nextStage();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full glass-card border border-slate-200/50 text-slate-500 hover:text-emerald-600 hover:border-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
          aria-label="Next Stage"
        >
          <ChevronRight className="w-5 h-5 md:w-6 h-6" />
        </button>
      )}

      {/* Carousel Indicators / Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {internshipStages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIdx
              ? "w-8 bg-emerald-600 shadow-sm"
              : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            aria-label={`Go to stage ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
