import React, { useState, useRef, useEffect } from "react";
import { Copy, Check, Instagram, Youtube, Mail, MapPin, Phone, Target, Cpu, Activity } from "lucide-react";
import { heroData } from "../config/portfolio";
import { gsap } from "gsap";

export default function HeroSection() {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);

  // Unified copy helper with fallback for non-secure HTTP (local IP testing)
  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback method
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Fallback copy failed: ", err);
      }
      document.body.removeChild(textArea);
    }
  };

  // Email copy function
  const copyEmail = async () => {
    try {
      await copyToClipboard(heroData.email);
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

  // Phone copy function
  const copyPhone = async () => {
    try {
      if (heroData.phone) {
        await copyToClipboard(heroData.phone);
        setPhoneCopied(true);
        setTimeout(() => {
          setPhoneCopied(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to copy phone number: ", err);
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

        {/* Left Column - Image Card (3D Tilt Frame) & Socials */}
        <div className="lg:col-span-5 flex flex-col items-center gap-6">
          <div
            className="w-full flex justify-center items-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
          >
            <div
              ref={cardRef}
              className="gpu-accelerated glass-card w-72 h-96 md:w-80 md:h-[450px] rounded-2xl p-4 flex flex-col items-center justify-between border border-slate-200/50 shadow-lg relative overflow-hidden select-none"
              style={{ transformStyle: "preserve-3d" }}
            >

              {/* Glowing avatar image */}
              <div className="w-full h-full rounded-xl bg-slate-100 border border-slate-200/30 flex flex-col items-center justify-center relative overflow-hidden group">
                <img
                  src={`${base}avatar.webp`}
                  alt={heroData.name}
                  className="absolute inset-0 w-full h-full object-cover scale-130 -translate-y-10 group-hover:scale-140 transition-all duration-700 ease-out"
                />

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 bg-white/70 px-3 py-1.5 rounded-lg backdrop-blur-md border border-slate-200/50">
                  <span className="text-[9px] tracking-wider text-slate-700 font-sans-data uppercase">Biomedical Engineering</span>
                  <span className="text-[9px] tracking-wider text-emerald-700 font-sans-data animate-pulse">● ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details (Address, Phone, Email) - Desktop Only */}
          <div className="hero-fade hidden lg:flex flex-col items-center gap-3.5 w-full max-w-[280px] md:max-w-[320px]">
            {/* Address */}
            {heroData.address && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans-data text-center">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="text-slate-700">{heroData.address}</span>
              </div>
            )}

            {/* Email & Phone Copying Widgets */}
            <div className="flex flex-col items-stretch gap-2.5 w-full">
              {/* Email Copy Widget */}
              <div className="flex items-center gap-1.5 w-full">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/50 border border-slate-200/50 shadow-inner backdrop-blur-md flex-1 overflow-hidden">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-800 text-[13px] font-sans-data select-all whitespace-nowrap overflow-hidden text-ellipsis">
                    {heroData.email}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  className={`gpu-accelerated cursor-pointer px-3 py-2 rounded-xl text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 border flex items-center justify-center gap-1.5 flex-shrink-0 ${copied
                    ? "bg-emerald-50 text-emerald-700 border-emerald-500/20"
                    : "bg-transparent text-slate-600 border-slate-200 hover:border-emerald-500/30 hover:bg-emerald-50/20"
                    }`}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Phone Copy Widget */}
              {heroData.phone && (
                <div className="flex items-center gap-1.5 w-full">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/50 border border-slate-200/50 shadow-inner backdrop-blur-md flex-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-800 text-[13px] font-sans-data select-all whitespace-nowrap">
                      {heroData.phone}
                    </span>
                  </div>
                  <button
                    onClick={copyPhone}
                    className={`gpu-accelerated cursor-pointer px-3 py-2 rounded-xl text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 border flex items-center justify-center gap-1.5 flex-shrink-0 ${phoneCopied
                      ? "bg-emerald-50 text-emerald-700 border-emerald-500/20"
                      : "bg-transparent text-slate-600 border-slate-200 hover:border-emerald-500/30 hover:bg-emerald-50/20"
                      }`}
                  >
                    {phoneCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{phoneCopied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Social Grid (WhatsApp, Instagram, YouTube) - Desktop Only */}
          <div className="hero-fade hidden lg:flex items-center justify-center gap-4">
            {Object.entries({
              whatsapp: { 
                href: heroData.socials.whatsapp, 
                icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ),
                label: "WhatsApp" 
              },
              instagram: { href: heroData.socials.instagram, icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
              youtube: { href: heroData.socials.youtube, icon: <Youtube className="w-4 h-4" />, label: "YouTube" }
            }).map(([key, data]) => (
              <a
                key={key}
                href={data.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-pill text-slate-500 hover:text-emerald-600 border border-slate-200 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
                aria-label={data.label}
              >
                {data.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column - Info Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <div className="space-y-6">

            {/* Name & Role */}
            <div className="space-y-2">
              <h1 className="hero-fade font-display text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
                {heroData.name}
              </h1>
              <h2 className="hero-fade font-display text-2xl md:text-3xl font-medium bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 bg-clip-text text-transparent pb-2">
                {heroData.role}
              </h2>
            </div>

            {/* Short punchy introduction */}
            <p className="hero-fade text-lg md:text-xl text-slate-600 max-w-2xl font-light leading-relaxed">
              {heroData.intro}
            </p>

            {/* Structured Topics Grid */}
            <div className="hero-fade grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {heroData.topics.map((topic, i) => {
                let IconComponent = Target;
                if (topic.icon === "cpu") IconComponent = Cpu;
                if (topic.icon === "activity") IconComponent = Activity;

                return (
                  <div 
                    key={i} 
                    className="p-4 rounded-xl border border-slate-200/50 bg-white/40 backdrop-blur-sm shadow-sm hover:border-emerald-500/20 hover:bg-emerald-500/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-500/10 flex-shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="font-sans-data font-semibold text-xs tracking-wider uppercase text-slate-700 whitespace-nowrap">
                        {topic.title}
                      </h3>
                    </div>
                    <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {topic.content}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Personal Attributes */}
            {heroData.personalAttributes && (
              <div className="hero-fade space-y-2.5 pt-3 border-t border-slate-200/40">
                <h3 className="text-[10px] font-sans-data font-bold uppercase tracking-widest text-slate-500">
                  Personal Attributes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  <ul className="space-y-2">
                    {heroData.personalAttributes.filter((_, idx) => idx % 2 === 0).map((attr, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600 text-[13px] md:text-sm font-light leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{attr}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {heroData.personalAttributes.filter((_, idx) => idx % 2 !== 0).map((attr, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600 text-[13px] md:text-sm font-light leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{attr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Contact Info (Address) - Mobile Only */}
            {heroData.address && (
              <div className="hero-fade flex lg:hidden items-center gap-1.5 text-xs md:text-sm text-slate-500 font-sans-data">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-slate-700">{heroData.address}</span>
              </div>
            )}

            {/* Email & Phone Copying Widgets (Always stacked vertically) - Mobile Only */}
            <div className="hero-fade flex lg:hidden flex-col items-start gap-3">
              {/* Email Copy Widget */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100/50 border border-slate-200/50 shadow-inner backdrop-blur-md flex-1 sm:flex-initial">
                  <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-800 text-[13px] font-sans-data select-all whitespace-nowrap">
                    {heroData.email}
                  </span>
                </div>

                <button
                  ref={copyBtnRef}
                  onClick={copyEmail}
                  className={`gpu-accelerated cursor-pointer px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 border flex items-center gap-2 ${copied
                    ? "bg-emerald-50 text-emerald-700 border-emerald-500/20 shadow-sm"
                    : "bg-transparent text-slate-600 hover:text-slate-900 border-slate-200 hover:border-emerald-500/30 hover:bg-emerald-50/20"
                    }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              {/* Phone Copy Widget */}
              {heroData.phone && (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100/50 border border-slate-200/50 shadow-inner backdrop-blur-md flex-1 sm:flex-initial">
                    <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-800 text-[13px] font-sans-data select-all whitespace-nowrap">
                      {heroData.phone}
                    </span>
                  </div>

                  <button
                    onClick={copyPhone}
                    className={`gpu-accelerated cursor-pointer px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 border flex items-center gap-2 ${phoneCopied
                      ? "bg-emerald-50 text-emerald-700 border-emerald-500/20 shadow-sm"
                      : "bg-transparent text-slate-600 hover:text-slate-900 border-slate-200 hover:border-emerald-500/30 hover:bg-emerald-50/20"
                      }`}
                  >
                    {phoneCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{phoneCopied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Social Grid (WhatsApp, Instagram, YouTube) - Mobile Only */}
            <div className="hero-fade flex lg:hidden items-center justify-center gap-4 pt-4">
              {Object.entries({
                whatsapp: { 
                  href: heroData.socials.whatsapp, 
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                  label: "WhatsApp" 
                },
                instagram: { href: heroData.socials.instagram, icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                youtube: { href: heroData.socials.youtube, icon: <Youtube className="w-4 h-4" />, label: "YouTube" }
              }).map(([key, data]) => (
                <a
                  key={key}
                  href={data.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
