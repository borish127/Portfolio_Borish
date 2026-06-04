import React, { useEffect, useState } from "react";
import { User, GraduationCap, Briefcase, FileText, FolderGit2, Wrench } from "lucide-react";
import { gsap } from "gsap";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  const navItems: NavItem[] = [
    { id: "hero", label: "Presentation", icon: <User className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
    { id: "experience", label: "Internship", icon: <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
    { id: "thesis", label: "Thesis", icon: <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
    { id: "skills", label: "Skills", icon: <Wrench className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Check if user is at the very bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection(navItems[navItems.length - 1].id);
        return;
      }

      let currentSection = "hero";
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          // Set active if scroll position is past the section top
          if (scrollPosition >= top - 20) {
            currentSection = item.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    // Run once on mount to set initial section
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = element.getBoundingClientRect().top + window.scrollY;
      const scrollObj = { y: window.scrollY };
      
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
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] sm:w-[94%] md:w-[92%] max-w-[960px]">
      <div className="glass-nav rounded-full px-2 py-2 md:px-4 md:py-2.5 flex items-center justify-between gap-1 sm:gap-2">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="text-slate-900 font-display font-bold tracking-tight text-xs sm:text-sm md:text-base pl-2 sm:pl-3 md:pl-4 hover:text-emerald-600 transition-colors"
        >
          BH<span className="text-emerald-500">.</span>
        </a>

        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-sans-data font-medium transition-all duration-300 whitespace-nowrap ${isActive
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
