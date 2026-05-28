import React, { useState, useRef, useEffect } from "react";
import { Copy, Check, MessageSquare, Instagram, Youtube, Mail } from "lucide-react";
import { heroData } from "../config/portfolio";
import { gsap } from "gsap";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);

  // Email copy function
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(heroData.email);
      setCopied(true);

      // Opacity cross-fade on copy button
      if (copyBtnRef.current) {
        gsap.fromTo(
          copyBtnRef.current,
          { opacity: 0.5 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // 3D Parallax Mouse Move Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Normalize coordinates (-0.5 to 0.5)
    const xPct = mouseX / width;
    const yPct = mouseY / height;

    // Maximum rotation angle in degrees
    const maxRotation = 12;

    // Calculate rotation (invert axes: X-mouse tilt rotates around Y-axis, Y-mouse tilt rotates around X-axis)
    const rotateX = -yPct * maxRotation;
    const rotateY = xPct * maxRotation;

    // Translate slightly to give a floating 3D translation effect
    const translateX = xPct * 15;
    const translateY = yPct * 15;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      x: translateX,
      y: translateY,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  // Initial load animation (minimal and immediate)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in hero elements immediately
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Float effect on image frame
      gsap.fromTo(
        cardRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.5)" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column - Image Card (3D Tilt Frame) */}
        <div 
          className="lg:col-span-5 flex justify-center items-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
        >
          <div
            ref={cardRef}
            className="gpu-accelerated glass-card w-72 h-96 md:w-80 md:h-[450px] rounded-2xl p-4 flex flex-col items-center justify-between border border-slate-200/50 shadow-lg relative overflow-hidden select-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glossy radial overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />

            {/* Glowing avatar image */}
            <div className="w-full h-full rounded-xl bg-slate-100 border border-slate-200/30 flex flex-col items-center justify-center relative overflow-hidden group">
              <img 
                src="/avatar.png" 
                alt={heroData.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 bg-white/70 px-3 py-1.5 rounded-lg backdrop-blur-md border border-slate-200/50">
                <span className="text-[9px] tracking-wider text-slate-700 font-sans-data uppercase">Instrument Calibration</span>
                <span className="text-[9px] tracking-wider text-emerald-700 font-sans-data animate-pulse">● ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Info Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <div className="space-y-6">
            
            {/* Tag / Pre-title */}
            <div className="hero-fade inline-block">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700 bg-emerald-500/5 rounded-full border border-emerald-500/10">
                Portfolio 2026
              </span>
            </div>

            {/* Name & Role */}
            <div className="space-y-2">
              <h1 className="hero-fade font-display text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
                {heroData.name}
              </h1>
              <h2 className="hero-fade font-display text-2xl md:text-3xl font-medium bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
                {heroData.role}
              </h2>
            </div>

            {/* Tagline & Biography (fully selectable) */}
            <p className="hero-fade text-lg md:text-xl text-slate-600 max-w-xl font-light leading-relaxed">
              {heroData.bio}
            </p>

            {/* Email copying widget */}
            <div className="hero-fade flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100/50 border border-slate-200/50 shadow-inner backdrop-blur-md">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-800 text-sm font-sans-data select-all">
                  {heroData.email}
                </span>
              </div>

              <button
                ref={copyBtnRef}
                onClick={copyEmail}
                className={`gpu-accelerated cursor-pointer px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 border flex items-center gap-2 ${
                  copied
                    ? "bg-emerald-50 text-emerald-700 border-emerald-500/20 shadow-sm"
                    : "bg-transparent text-slate-600 hover:text-slate-900 border-slate-200 hover:border-emerald-500/30 hover:bg-emerald-50/20"
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Social Grid (WhatsApp, Gmail, Instagram, YouTube) */}
            <div className="hero-fade pt-4 flex items-center gap-4">
              {Object.entries({
                whatsapp: { href: heroData.socials.whatsapp, icon: <MessageSquare className="w-4 h-4" />, label: "WhatsApp" },
                gmail: { href: heroData.socials.gmail, icon: <Mail className="w-4 h-4" />, label: "Email" },
                instagram: { href: heroData.socials.instagram, icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                youtube: { href: heroData.socials.youtube, icon: <Youtube className="w-4 h-4" />, label: "YouTube" }
              }).map(([key, data]) => (
                <a
                  key={key}
                  href={data.href}
                  target={key !== "gmail" ? "_blank" : undefined}
                  rel={key !== "gmail" ? "noopener noreferrer" : undefined}
                  className="p-3 rounded-xl glass-pill text-slate-500 hover:text-emerald-600 border border-slate-200 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
                  aria-label={data.label}
                >
                  {data.icon}
                </a>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
