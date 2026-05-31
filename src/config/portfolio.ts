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
  name: "Boris Hage",
  role: "Biomedical Engineer Advanced Student",
  tagline: "Advanced Bioengineering Student",
  email: "borishage7@gmail.com",
  bio: "Advanced Biomedical Engineering student with a strong focus on the latest trends and technologies in the field. I like very much electronics and robotics. I have experience diagnosing and fixing electronic biomedical devices. I am very creative developing solutions for complex problems using tools from mechanical, electronics, programming and modeling. I know programming in C for firware in embebbed systems, C++ for Object Oriented Programming, Python for data analysis and scientific computing, and some web development basics. In my career I choose Computing Networks and Artificial Intelligence as specializations. Currently I am working on my final graduation project that consists in Pulse wave and Heart rate monitoring during a MRI study using a pneumatical method.",
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
    degree: "Hight School",
    period: "2013 — 2018",
    highlights: [
      "Social science orientation.",
      "Five years in Math Olympiad.",
    ]
  },
  {
    institution: "Facultad de Ingeniería, Universidad Nacional de Entre Ríos",
    degree: "Bioengineer",
    period: "2019 — 2026",
    highlights: [
      "Specialized in Electronics and Robotics, Computing Networks and Artificial Intelligence",
      "Internship at Sanatorio Adventista del Plata.",
      "Working in the final graduation project: Pulse wave and Heart rate monitoring during a MRI study using a pneumatical method."
    ]
  }
];

export const internshipStages: InternshipStage[] = [
  {
    stage: 1,
    title: "Update electronical system of the hospital guillotine",
    subtitle: "Maintenance Intern • Sanatorio Adventista del Plata",
    narrative: "Redesign the entire electronical system of the hospital guillotine. Changed the old analogic system for a digital one using arduino board and programmed in C.",
    tools: ["Arduino - IDE", "FreeCAD", "KiCad", "3D printing", "PCB Design", "Soldering"],
    images: ["../public/project1_1.png", "../public/project1_2.png"],
    imageLayout: "rows"
  },
  {
    stage: 2,
    title: "Activation / Deactivation logic for MRI cooler pump",
    subtitle: "Electronics and Firmware Intern • Sanatorio Adventista del Plata",
    narrative: "Developed the activation / deactivation logic for the MRI cooler pump. To prevent pump aging and unnecessary energy consumption, I designed a logic that takes the current used by the MRI magnet to detect when a study is running and based on that turns on and off the pump. Also during nights or long periods without using the MRI, the pump has cycles to turn on/off.",
    tools: ["Arduino - IDE", "FreeCAD", "KiCad", "3D printing", "PCB Design", "Soldering"],
    images: ["../public/project2_1.png", "../public/project2_2.png"]
  },
  {
    stage: 3,
    title: "Implementation of PWM motor speed modulation",
    subtitle: "Electronics and Firmware Intern • Sanatorio Adventista del Plata",
    narrative: "I made a PWM modulator to control the speed of an air pump for a heated blanket used in surgeries.",
    tools: ["KiCad", "PCB Design", "Soldering"],
    images: ["../public/project3_1.png", "../public/project3_2.png"]
  },
  {
    stage: 4,
    title: "Miscellaneous Bioengineering & Circuits",
    subtitle: "Additional Work & Projects",
    narrative: "Various additional bioengineering projects, instrumentation controllers, and circuit prototyping designed to optimize clinical operations and hardware interfaces.",
    tools: ["C/C++", "LabVIEW", "Electronics Calibration"],
    images: ["../public/project4_1.png", "../public/project4_2.png"]
  }
];

export const currentWorkData: CurrentWorkData = {
  company: "Universidad Adventista del Plata",
  role: "Maintenance of Biologic Microscopes at Medical School",
  period: "February 2026 — Present",
  description: "Maintenance of optic and electronic systems of biologic microscopes used in the Medical School at Universidad Adventista del Plata.",
  bullets: [
    "Diagnose and fixing electronic problems in the microscopes",
    "Fixing optic problems in the microscopes",
    "Updating electronic systems of the microscopes from light bulbs to LED lighting",
    "Development in progress: A new inventory system for the faculty."
  ],
  placeholderType: "Maintenance"
};

export const universityProject: UniversityProjectData = {
  title: "Pulse wave and Heart rate monitoring during a MRI study using a pneumatical method",
  subtitle: "Final Graduation Project",
  abstract: "Design of an experimental system for monitoring pulse wave and heart rate during a MRI study using a pneumatical method.",
  paperUrl: "https://arxiv.org",
  tags: ["Bio-Signal Processing", "Compositor Architecture", "Clinical Data Visualization", "Sensory Interface Design"]
};

export const personalProjects: PersonalProjectItem[] = [
  {
    title: "PyFDA Web",
    description: "An Open Source Web application for digital signal processing and digital filter design.",
    githubUrl: "https://github.com/borish127/PyFDA-Web",
    tags: ["Python", "Streamlit", "Plotly"],
    placeholderType: "DSP"
  },
  {
    title: "PDFNote Web",
    description: "An Open Source Web application for taking MarkDown notes of PDF files.",
    githubUrl: "https://github.com/borish127/PDFNote_web",
    tags: ["Javascript", "HTML", "CSS"],
    placeholderType: "study"
  },
  {
    title: "QR Code Generator",
    description: "An Open Source Web application for generating QR Codes without needing account registration or design limits.",
    githubUrl: "https://github.com/borish127/qrcode-generator",
    tags: ["Javascript", "HTML", "CSS", "QR Code"],
    placeholderType: "generator"
  }
];
