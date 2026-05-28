export interface HeroData {
  name: string;
  role: string;
  tagline: string;
  email: string;
  bio: string;
  socials: {
    whatsapp: string;
    gmail: string;
    instagram: string;
    youtube: string;
  };
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  highlights: string[];
}

export interface InternshipStage {
  stage: number;
  title: string;
  subtitle: string;
  narrative: string;
  tools: string[];
  metricLabel?: string;
  metricValue?: string;
  placeholderType: "microfluidics" | "spectrometry" | "telemetry";
}

export interface CurrentWorkData {
  company: string;
  role: string;
  period: string;
  description: string;
  bullets: string[];
  placeholderType: "bioreactor";
}

export interface UniversityProjectData {
  title: string;
  subtitle: string;
  abstract: string;
  paperUrl: string;
  tags: string[];
}

export interface PersonalProjectItem {
  title: string;
  description: string;
  githubUrl: string;
  tags: string[];
  placeholderType: "signal" | "structure" | "telemetry";
}

export const heroData: HeroData = {
  name: "Evelyn Vance",
  role: "Bioengineering Interface Specialist",
  tagline: "Engineering Precision Diagnostics & Visual Computing Interfaces.",
  email: "evelyn.vance.dev@gmail.com",
  bio: "Specializing in the intersection of biomedical engineering, fluid dynamics modeling, and high-fidelity interface design. I craft highly performant interactive systems that translate real-time sensor streams and laboratory diagnostics into sophisticated, hardware-accelerated scientific tools.",
  socials: {
    whatsapp: "https://wa.me/1234567890",
    gmail: "mailto:evelyn.vance.dev@gmail.com",
    instagram: "https://instagram.com/evelynvance.dev",
    youtube: "https://youtube.com/@evelynvance"
  }
};

export const educationData: EducationItem[] = [
  {
    institution: "Institute of Biomedical Technologies",
    degree: "M.S. in Bioengineering & Computational Biomechanics",
    period: "2024 — 2026",
    highlights: [
      "Specialized in microfluidics simulation, bio-signal processing, and optical diagnostics.",
      "Published research on high-frequency bio-signal rendering offloading paths.",
      "Developed interactive 3D visualizations for orthopedic biomechanical stresses."
    ]
  },
  {
    institution: "Apex University of Science",
    degree: "B.S. in Biomedical Engineering (Summa Cum Laude)",
    period: "2020 — 2024",
    highlights: [
      "Concentrations in Biosensors, Mathematical Physiology, and Medical Computing.",
      "Graduated in the top 1% of the engineering department (GPA: 3.96/4.0).",
      "Designed a low-cost spectrophotometer interface as an undergraduate thesis."
    ]
  }
];

export const internshipStages: InternshipStage[] = [
  {
    stage: 1,
    title: "Microfluidic Modeling",
    subtitle: "R&D Internship • Helix Diagnostics Labs",
    narrative: "Assigned to the microfluidic chip design team. I modeled laminar flow boundaries and micro-channel geometries using COMSOL and built an interactive dashboard to overlay simulation grids with real-time test sensor feeds.",
    tools: ["COMSOL Multiphysics", "MATLAB", "CAD Modeling", "Python (NumPy)"],
    placeholderType: "microfluidics"
  },
  {
    stage: 2,
    title: "Optical Spectrometry",
    subtitle: "Developing Diagnostic Diagnostics Telemetry",
    narrative: "Designed a real-time visualization client for high-frequency optical spectrometer telemetry. By transitioning rendering pipelines to GPU-accelerated canvas layers, we achieved steady 60Hz rendering for multi-spectral analysis charts.",
    tools: ["WebGL", "TypeScript", "Spectrometer Sensor APIs", "GSAP"],
    placeholderType: "spectrometry"
  },
  {
    stage: 3,
    title: "Clinical System Delivery",
    subtitle: "Optimization & Instrument Calibration Results",
    narrative: "Calibrated optical sensors and optimized rendering libraries on embeddable medical tablets. We successfully eliminated rendering stutters on patient-monitoring viewports, reducing data rendering lag to under 2ms.",
    tools: ["Web Vitals API", "Embedded Linux", "Lighthouse CI", "Chrome Profiler"],
    metricLabel: "Sensory Latency Improvement",
    metricValue: "99.8% Sync",
    placeholderType: "telemetry"
  }
];

export const currentWorkData: CurrentWorkData = {
  company: "Vortex Biotech",
  role: "Lead Instrumentation Interface Engineer",
  period: "Sept 2025 — Present",
  description: "Driving interface strategy and layout mechanics for automated bioreactor monitoring systems. Designing low-latency data feeds mapped directly to high-frequency telemetry dashboards, ensuring consistent rendering performance for critical clinical trials.",
  bullets: [
    "Orchestrate component structure using Astro server islands and React client hydration.",
    "Implement WebAssembly-based analytical widgets to optimize rendering paths for real-time bioreactor charts.",
    "Pioneered a unified micro-interaction design system across three separate application ecosystems."
  ],
  placeholderType: "bioreactor"
};

export const universityProject: UniversityProjectData = {
  title: "High-Frequency Physiological Waveform Plotting & Compositor Offloading",
  subtitle: "Graduate Master's Thesis & Capstone Project",
  abstract: "An investigation into real-time rendering of high-frequency bio-signals (ECG, EEG, EMG) on web-based diagnostic viewports. This research proposes a framework for offloading scroll-linked calculations directly to the GPU compositor thread using CSS Scroll-driven animations, ensuring zero main-thread blockage during concurrent heavy database queries.",
  paperUrl: "https://arxiv.org",
  tags: ["Bio-Signal Processing", "Compositor Architecture", "Clinical Data Visualization", "Sensory Interface Design"]
};

export const personalProjects: PersonalProjectItem[] = [
  {
    title: "Bioreactor Controller Panel",
    description: "A clean, highly performant monitoring portal tracking bioreactor environmental factors (temperature, pH, DO). Powered by glassmorphic interfaces and hardware-accelerated grid layouts to maintain consistent 120Hz render updates.",
    githubUrl: "https://github.com",
    tags: ["Astro", "React", "GSAP", "Chart.js"],
    placeholderType: "telemetry"
  },
  {
    title: "3D Protein Structural Browser",
    description: "A browser-based interactive command interface and 3D canvas viewer for rendering molecular PDB structures, featuring offloaded GPU computations and ambient molecular shaders.",
    githubUrl: "https://github.com",
    tags: ["Three.js", "WebGL", "TypeScript", "Biophysical APIs"],
    placeholderType: "structure"
  },
  {
    title: "Vapor Diagnostic Interface",
    description: "A mobile-first gesture prototype simulating diagnostic biosensor telemetry. Developed specifically to evaluate swipe controls and inertia scroll mapping on clinical touch tablets.",
    githubUrl: "https://github.com",
    tags: ["React", "Framer Motion", "Touch Events API"],
    placeholderType: "signal"
  }
];
