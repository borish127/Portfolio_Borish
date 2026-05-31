import React, { useEffect, useState } from "react";
import { User, GraduationCap, Briefcase, FileText, FolderGit2 } from "lucide-react";
import { gsap } from "gsap";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  const navItems: NavItem[] = [
    { id: "hero", label: "Presentation", icon: <User className="w-4 h-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "experience", label: "Internship", icon: <Briefcase className="w-4 h-4" /> },
    { id: "thesis", label: "Thesis", icon: <FileText className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when the section occupies a good chunk of the viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = element.getBoundingClientRect().top + window.pageYOffset;
      const scrollObj = { y: window.pageYOffset };
      
      gsap.to(scrollObj, {
        y: yOffset,
        duration: 0.85,
        ease: "power2.inOut",
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y);
        }
      });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[720px]">
      <div className="glass-nav rounded-full px-2 py-1.5 md:px-4 md:py-2 flex items-center justify-between gap-1 md:gap-2">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="text-slate-900 font-display font-bold tracking-tight text-sm md:text-base pl-2 md:pl-4 hover:text-emerald-600 transition-colors"
        >
          BH<span className="text-emerald-500">.</span>
        </a>

        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-sans-data font-medium transition-all duration-300 ${isActive
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-500/20"
                  : "text-slate-500 hover:text-slate-900 border border-transparent"
                  }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
