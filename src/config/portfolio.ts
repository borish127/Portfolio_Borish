export interface HeroData {
  name: string;
  role: string;
  tagline: string;
  email: string;
  bio: string; // Keep for backward compatibility/reference
  address?: string;
  phone?: string;
  socials: {
    whatsapp: string;
    gmail: string;
    instagram: string;
    youtube: string;
  };
  intro: string;
  topics: {
    title: string;
    icon: string;
    content: string;
  }[];
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
  placeholderType?: string;
  images?: string[];
  imageLayout?: "cols" | "rows";
}

export interface CurrentWorkData {
  company: string;
  role: string;
  period: string;
  description: string;
  bullets: string[];
  placeholderType: string;
  image?: string;
}

export interface UniversityProjectData {
  title: string;
  subtitle: string;
  abstract: string;
  paperUrl?: string;
  tags: string[];
}

export interface PersonalProjectItem {
  title: string;
  description: string;
  githubUrl: string;
  tags: string[];
  placeholderType?: string;
  image?: string;
  liveUrl?: string;
}

export const heroData: HeroData = {
  name: "Boris Hage",
  role: "Biomedical Engineering Advanced Student",
  tagline: "Advanced Bioengineering Student",
  email: "borishage7@gmail.com",
  address: "Los Pioneros 1080 • Libertador San Martín, E3103",
  phone: "+5492266440214",
  bio: `Advanced Biomedical Engineering student with a strong focus on the latest trends and technologies in the field. I like very much electronics and robotics. I have experience diagnosing and fixing electronic biomedical devices. I am very creative developing solutions for complex problems using tools from mechanical, electronics, programming and modeling. I know programming in C for firware in embebbed systems, C++ for Object Oriented Programming, Python for data analysis and scientific computing, and some web development basics. In my career I choose Computing Networks and Artificial Intelligence as specializations. Currently I am working on my final graduation project that consists in Pulse wave and Heart rate monitoring during a MRI study using a pneumatical method.

Professional Summary: Advanced bioengineering student with a creative mindset and quick learning ability. Skilled in electronics, technical diagnostics, and device repair. Actively seeking opportunities as a Bioengineer, Clinical Engineer, or Maintenance Engineer. I am eager to contribute my skills to the AdventHealth organization and would welcome the opportunity to join your team.`,
  intro: "Advanced Biomedical Engineering student with a creative mindset and quick learning ability. Specialized in electronic diagnostics, medical hardware maintenance, and programming. Skilled in translating clinical requirements into robust, high-safety technical solutions.",
  topics: [
    {
      title: "Career Objective",
      icon: "target",
      content: "Actively seeking bioengineer, clinical engineering, or hardware maintenance roles."
    },
    {
      title: "Technical DNA",
      icon: "cpu",
      content: "Proficient in device diagnostics/repair, microcontroller firmware (C/C++), and data processing (Python) combined with CAD/PCB modeling."
    },
    {
      title: "Thesis & Focus",
      icon: "activity",
      content: "Specialized in Computer Networks & AI. Currently developing an MRI-compatible pneumatic pulse wave & heart rate monitoring system."
    }
  ],
  socials: {
    whatsapp: "https://wa.me/+5492266440214",
    gmail: "borishage7@gmail.com",
    instagram: "https://www.instagram.com/borish127?igsh=eWNmbnJ0c3pvNzQ5",
    youtube: "https://youtube.com/@borish127"
  }
};

export const educationData: EducationItem[] = [
  {
    institution: "Instituto Adventista Balcarce",
    degree: "High School",
    period: "2013 — 2018",
    highlights: [
      "Social science orientation.",
      "Five years in the Math Olympiad."
    ]
  },
  {
    institution: "Facultad de Ingeniería, Universidad Nacional de Entre Ríos",
    degree: "Bioengineering / Biomedical Engineering",
    period: "2019 — 2026",
    highlights: [
      "Expected graduation: End of 2026",
      "Thesis: Pulse wave and Heart rate monitoring in Magnetic Resonance study.",
      "Student Internship: Clinical Engineering at Sanatorio Adventista del Plata.",
      "Specialized in Electronics and Robotics, Computing Networks and Artificial Intelligence",
      "Relevant Coursework: Signal Acquisition, Filtering, and Processing; Robotics; Electronics; Embedded Systems and Microcontrollers; Medical Imaging; Medical Instrumentation and Devices; Diagnostic and Monitoring Instrumentation; Programming (C, Python, C++); CAD Design and Modeling; Mechanical Physics; Electrical Physics; Thermodynamics; Fluid Mechanics; Clinical Engineering; Hospital Engineering; Modeling of Biological Systems."
    ]
  }
];

const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export const internshipStages: InternshipStage[] = [
  {
    stage: 1,
    title: "Update electronical system of the hospital guillotine",
    subtitle: "Maintenance Intern • Sanatorio Adventista del Plata",
    narrative: "Redesign the entire electronical system of the hospital guillotine. Changed the old analogic system for a digital one using arduino board and programmed in C.",
    tools: ["Arduino - IDE", "FreeCAD", "KiCad", "3D printing", "PCB Design", "Soldering"],
    images: [`${base}project1_1.webp`, `${base}project1_2.webp`],
    imageLayout: "rows"
  },
  {
    stage: 2,
    title: "Activation / Deactivation logic for MRI cooler pump",
    subtitle: "Electronics and Firmware Intern • Sanatorio Adventista del Plata",
    narrative: "Developed the activation / deactivation logic for the MRI cooler pump. To prevent pump aging and unnecessary energy consumption, I designed a logic that takes the current used by the MRI magnet to detect when a study is running and based on that turns on and off the pump. Also during nights or long periods without using the MRI, the pump has cycles to turn on/off.",
    tools: ["Arduino - IDE", "FreeCAD", "KiCad", "3D printing", "PCB Design", "Soldering"],
    images: [`${base}project2_1.webp`, `${base}project2_2.webp`]
  },
  {
    stage: 3,
    title: "Implementation of PWM motor speed modulation",
    subtitle: "Electronics and Firmware Intern • Sanatorio Adventista del Plata",
    narrative: "I made a PWM modulator to control the speed of an air pump for a heated blanket used in surgeries.",
    tools: ["KiCad", "PCB Design", "Soldering"],
    images: [`${base}project3_1.webp`, `${base}project3_2.webp`]
  },
  {
    stage: 4,
    title: "Miscellaneous Bioengineering & Circuits",
    subtitle: "Additional Work & Projects",
    narrative: "Various additional bioengineering projects, instrumentation controllers, and circuit prototyping designed to optimize clinical operations and hardware interfaces.",
    tools: ["C/C++", "LabVIEW", "Electronics Calibration"],
    images: [`${base}project4_1.webp`, `${base}project4_2.webp`]
  }
];

export const currentWorkData: CurrentWorkData = {
  company: "Universidad Adventista del Plata",
  role: "Maintenance Engineer (Biologic Microscopes at Medical School)",
  period: "February 2026 — Present",
  description: "Executed routine maintenance and provided technical support for optical microscopes across multiple Medical School laboratories at Universidad Adventista del Plata.",
  bullets: [
    "Executed routine maintenance and provided technical support for optical microscopes across multiple Medical School laboratories, diagnosing and fixing electronic and optical issues.",
    "Modernized optical microscope systems by retrofitting legacy bulb assemblies and transformers with efficient 5V LED illumination.",
    "Streamlined inventory management protocols for lab equipment, ensuring supply availability (Development in progress: A new inventory system for the faculty)."
  ],
  placeholderType: "Maintenance",
  image: `${base}uap-lab.webp`
};

export const universityProject: UniversityProjectData = {
  title: "Pulse wave and Heart rate monitoring during a MRI study using a pneumatical method",
  subtitle: "Final Graduation Project",
  abstract: "Traditional vital sign monitors contain metallic and electronic components that interfere with strong magnetic fields, making them incompatible with Magnetic Resonance Imaging (MRI) environments. Current systems bypass this using shielded cables, optical methods, or electro-resistive electrodes, but pneumatic/hydraulic approaches remain unexplored for continuous cardiac monitoring. This graduation project presents a novel, MRI-compatible, continuous heart rate and pulse wave monitoring device utilizing a pneumatic sensing method. Designed to be completely metal-free and electrically insulated, it ensures patient safety and electromagnetic compatibility (EMC) without compromising diagnostic accuracy or clinical utility. The system provides doctors with real-time waveform analytics via a comfortable, non-invasive patient interface.",
  paperUrl: "",
  tags: ["Bio-Signal Processing", "Pneumatic Sensing", "Electromechanical Design", "Clinical Data Visualization", "Sensory Interface Design"]
};

export const personalProjects: PersonalProjectItem[] = [
  {
    title: "PyFDA-Web (Digital Signal Processing Tool)",
    description: "Developed a client-side web application for DSP filter design, utilizing WebAssembly and Pyodide to run Python code (scipy/numpy) directly in the browser. Features include IIR/FIR filter design, frequency response analysis, and pole-zero plots using Material Design 3 and Plotly.js.",
    githubUrl: "https://github.com/borish127/PyFDA-Web",
    tags: ["Python", "WebAssembly", "Pyodide", "Scipy", "Numpy", "Material Design 3", "Plotly.js"],
    image: `${base}pyfda-web.webp`,
    liveUrl: "https://borish127.github.io/PyFDA-Web/"
  },
  {
    title: "PDFNote_web",
    description: "A functional web tool built from scratch, focusing on utility and efficient user interface design.",
    githubUrl: "https://github.com/borish127/PDFNote_web",
    tags: ["JavaScript", "HTML", "CSS"],
    image: `${base}pdfnote-web.webp`,
    liveUrl: "https://borish127.github.io/PDFNote_web/"
  },
  {
    title: "QR Code Generator",
    description: "A functional web tool built from scratch, focusing on utility and efficient user interface design.",
    githubUrl: "https://github.com/borish127/qrcode-generator",
    tags: ["JavaScript", "HTML", "CSS", "QR Code"],
    image: `${base}qrcode-generator.webp`,
    liveUrl: "https://borish127.github.io/qrcode-generator/"
  }
];

export interface SkillsData {
  technical: string[];
  languages: { language: string; level: string }[];
  interests: {
    title: string;
    description: string;
    iconName: string;
  }[];
}

export const skillsData: SkillsData = {
  technical: [
    "Programming (C, Python, Web Development)",
    "Electronics",
    "CAD Design",
    "3D Printing",
    "PCB Circuit Design",
    "Robotics",
    "Signal Processing",
    "Technical Diagnostics and Repair"
  ],
  languages: [
    { language: "Spanish", level: "Native" },
    { language: "English", level: "Intermediate" }
  ],
  interests: [
    {
      title: "Electronics & Hobbies",
      description: "Passionate about designing circuits, giving new life to household gadgets through hardware retrofitting, and optimizing residential electrical systems.",
      iconName: "zap"
    },
    {
      title: "Music",
      description: "Accomplished clarinetist, guitarist, and singer. Focused on musical arrangement, conducting, digital audio recording, and video production.",
      iconName: "music"
    },
    {
      title: "Tech & Web",
      description: "Linux daily driver and open-source enthusiast. Experienced in system optimization, experimenting with open-source environments, and building web tools from scratch.",
      iconName: "terminal"
    }
  ]
};
