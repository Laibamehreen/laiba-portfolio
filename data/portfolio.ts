export interface SkillItem {
  name: string;
  iconName: string;
  category: "frontend" | "backend" | "mobile" | "database" | "tools";
  description?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  color: string;
  skills: { name: string; icon: string; description: string }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period?: string;
  badge: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  certificateAvailable?: boolean;
  certificateName?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  featured?: boolean;
  tagline: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  category: "Full Stack" | "Backend / Java" | "Mobile" | "Frontend" | "AI";
  highlights: string[];
  architectureDetails?: {
    type: "backend" | "fullstack" | "mobile" | "web";
    layers?: string[];
    endpoints?: { method: "GET" | "POST" | "PUT" | "DELETE"; path: string; desc: string }[];
  };
  metrics?: { label: string; value: string }[];
  githubUrl: string;
  liveDemoUrl?: string;
  image?: string;
}

export interface CertificateData {
  title: string;
  issuer: string;
  field: string;
  issueDate: string;
  credentialId: string;
  verificationUrl?: string;
  pdfPath?: string;
  skillsCovered: string[];
  description: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Laiba Mehreen",
    role: "Full Stack Developer & Java Developer",
    email: "laibamehreenk@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    location: "Available for Worldwide Opportunities",
    availability: "Open to opportunities",
    bio: "I build modern web applications and reliable backend systems using React, Next.js, Java, and Spring Boot. I enjoy turning ideas into practical, clean, and user friendly digital products.",
    education: {
      degree: "BS Computer Science",
      status: "Currently Pursuing",
      description: "Focusing on core computing fundamentals, data structures, algorithms, modern web engineering, and enterprise backend architectures.",
    },
    primaryFocus: "Full Stack Web & Java Spring Boot Backend Development",
  },

  skillsCategories: [
    {
      title: "Frontend Development",
      description: "Building responsive, modern, and accessible user interfaces with dynamic component architectures.",
      icon: "Layout",
      color: "from-blue-500/20 to-violet-500/20 text-blue-400 border-blue-500/30",
      skills: [
        { name: "React.js", icon: "Atom", description: "Component-driven SPA architectures & hooks" },
        { name: "Next.js", icon: "Layers", description: "App Router, SSR, Server Actions & optimization" },
        { name: "Tailwind CSS", icon: "Palette", description: "Utility-first responsive layouts & themes" },
        { name: "shadcn/ui", icon: "Component", description: "Accessible, reusable design systems & primitives" },
      ],
    },
    {
      title: "Backend Engineering",
      description: "Architecting high-throughput, layered backend services, enterprise logic, and secure APIs.",
      icon: "Server",
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
      skills: [
        { name: "Java", icon: "Coffee", description: "Robust OOP, memory management & concurrency" },
        { name: "Spring Boot", icon: "ShieldAlert", description: "Controllers, Services, Repositories, JPA & REST" },
      ],
    },
    {
      title: "Mobile Development",
      description: "Crafting cross-platform mobile user experiences with native-level responsiveness.",
      icon: "Smartphone",
      color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
      skills: [
        { name: "React Native", icon: "Smartphone", description: "Cross-platform iOS & Android mobile apps" },
      ],
    },
    {
      title: "Databases & Services",
      description: "Designing schema models, real-time synchronizations, and persistent document storage.",
      icon: "Database",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      skills: [
        { name: "MongoDB", icon: "Database", description: "NoSQL document collections, aggregations & schemas" },
        { name: "Firebase", icon: "Flame", description: "Realtime database, authentication & cloud hosting" },
      ],
    },
    {
      title: "Developer Tools",
      description: "Version management, collaborative development, and continuous iteration workflows.",
      icon: "Wrench",
      color: "from-rose-500/20 to-violet-500/20 text-rose-400 border-rose-500/30",
      skills: [
        { name: "Git", icon: "GitBranch", description: "Branching workflows, merges & version history" },
        { name: "GitHub", icon: "Github", description: "Repositories, pull requests, collaboration & CI/CD" },
      ],
    },
  ] as SkillCategory[],

  experience: [
    {
      role: "Full Stack Developer",
      company: "Xappo Enterprises",
      badge: "Completed Internship",
      summary: "Completed professional full stack development experience and received an internship completion certificate.",
      highlights: [
        "Worked on full stack software development across client-facing interfaces and backend integrations.",
        "Built and improved application features, enhancing user experience and system throughput.",
        "Collaborated using modern frontend frameworks and structured backend technologies.",
        "Completed the professional internship program successfully and received an official completion certificate.",
      ],
      technologies: ["React.js", "Node.js", "REST APIs", "Tailwind CSS", "Git"],
      certificateAvailable: true,
      certificateName: "Full Stack Software Engineering Internship Certificate",
    },
    {
      role: "Java Developer",
      company: "WarmBytes Ltd",
      badge: "Professional Experience",
      summary: "Worked on Java and Spring Boot based backend development, REST APIs, business logic, database integration, and backend application development.",
      highlights: [
        "Engineered scalable RESTful APIs with clean HTTP status semantics, validation, and error interceptors.",
        "Implemented layered architecture separating concerns into Controllers, Services, Repositories, and Entities.",
        "Authored Data Transfer Objects (DTOs) and entity mappings for secure and decoupled payload handling.",
        "Integrated relational databases, optimized queries, and implemented comprehensive backend business logic.",
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "Spring Data JPA", "Layered Architecture", "DTOs"],
      certificateAvailable: false,
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "ai-career-advisor",
      title: "AI Career Advisor",
      featured: true,
      category: "AI",
      tagline: "Intelligent career path mapping & personalized AI advisory platform for students",
      description:
        "An AI powered career guidance platform that helps students explore career paths, understand their skills, and receive personalized career recommendations.",
      fullDescription:
        "A student-focused platform built with Next.js App Router and shadcn/ui. Incorporates an interactive AI career chatbot that conducts dynamic skill assessments, evaluates student interests, and synthesizes tailored career paths, course recommendations, and roadmap milestones.",
      techStack: ["Next.js", "Tailwind CSS", "shadcn/ui", "AI Chatbot", "TypeScript"],
      highlights: [
        "Interactive AI Chatbot with natural-language student guidance and career query answering",
        "Personalized career pathway recommendations based on skill analysis and user background",
        "Modern dashboard interface with smooth metric visualizations and progress tracking",
        "Student-focused user experience optimized for desktop, tablet, and mobile displays",
        "Modern Next.js App Router architecture with modular shadcn/ui components",
      ],
      metrics: [
        { label: "Architecture", value: "Next.js App Router" },
        { label: "UI System", value: "shadcn/ui Primitives" },
        { label: "Intelligence", value: "AI Career Chatbot" },
      ],
      githubUrl: "https://github.com/Laibamehreen/ai-career-advisor",
      liveDemoUrl: "https://ai-career-advisor-olive.vercel.app/",
    },
    {
      id: "hospital-management-system",
      title: "Hospital Management System",
      featured: false,
      category: "Full Stack",
      tagline: "Comprehensive clinical workflows, patient records, and hospital data management",
      description:
        "A hospital management web application designed to manage hospital related operations through a simple and organized interface.",
      fullDescription:
        "Engineered to streamline healthcare workflows by centralizing patient admissions, doctor appointment scheduling, bed allocations, and electronic medical records into a clean, intuitive dashboard.",
      techStack: ["React.js", "MongoDB", "Tailwind CSS", "REST API", "Express.js"],
      highlights: [
        "Patient management system with intake records, appointment tracking, and history",
        "Hospital data management for departments, doctors, and facility resource status",
        "Responsive user interface built with reusable and modular React components",
        "MongoDB database integration with efficient document schemas for clinical data",
        "Secure record querying and real-time appointment status updates",
      ],
      metrics: [
        { label: "Database", value: "MongoDB NoSQL" },
        { label: "Frontend", value: "React.js Modular UI" },
        { label: "Operations", value: "Patients & Hospital Data" },
      ],
      githubUrl: "https://github.com",
      liveDemoUrl: "https://hospital-mgt-system-demo.vercel.app",
    },
    {
      id: "inventory-management-system",
      title: "Inventory Management System",
      featured: false,
      category: "Backend / Java",
      tagline: "Enterprise layered backend system built with Java, Spring Boot, and robust REST APIs",
      description:
        "A backend focused inventory management system developed using Java and Spring Boot with complete layered architecture.",
      fullDescription:
        "Designed and implemented strictly following enterprise Spring Boot conventions. Features full CRUD endpoints for inventory items, stock auditing, automated input validation, exception handling middleware, and decoupled DTO mappings.",
      techStack: ["Java", "Spring Boot", "Spring Data JPA", "REST APIs", "Layered Architecture"],
      highlights: [
        "Layered backend architecture: Controllers -> Services -> Repositories -> Entities",
        "REST API development with comprehensive CRUD endpoints and HTTP status code semantics",
        "Robust input validation and centralized GlobalExceptionHandler for meaningful client errors",
        "Data Transfer Objects (DTO) and Entity isolation ensuring safe data contracts",
        "Database integration with Spring Data JPA for transaction management and query handling",
      ],
      architectureDetails: {
        type: "backend",
        layers: [
          "Controllers: API Endpoints & Request Mapping",
          "Services: Business Logic & Transaction Handling",
          "Repositories: Spring Data JPA & Database Queries",
          "Entities: Database Models & Relational Constraints",
          "DTOs & Validators: Payload Sanitization & Exception Handling",
        ],
        endpoints: [
          { method: "GET", path: "/api/v1/inventory", desc: "Retrieve paginated stock items with filters" },
          { method: "POST", path: "/api/v1/inventory", desc: "Create new inventory item with validation" },
          { method: "PUT", path: "/api/v1/inventory/{id}", desc: "Update stock levels and product attributes" },
          { method: "DELETE", path: "/api/v1/inventory/{id}", desc: "Safe soft-delete item and audit changes" },
        ],
      },
      metrics: [
        { label: "Framework", value: "Java & Spring Boot" },
        { label: "Pattern", value: "Layered MVC & DTOs" },
        { label: "Reliability", value: "Global Exception Handler" },
      ],
      githubUrl: "https://github.com",
    },
    {
      id: "health-guide-app",
      title: "Health Guide App",
      featured: false,
      category: "Mobile",
      tagline: "Cross-platform mobile wellness & health advisory app with Firebase backend",
      description:
        "A mobile health guide application developed using React Native and Firebase for accessible health guidance.",
      fullDescription:
        "Mobile-first health guide engineered to deliver immediate wellness information, symptom exploration, emergency health tips, and personalized health guidelines with Firebase real-time data synchronization.",
      techStack: ["React Native", "Firebase", "Mobile UI", "Cross-Platform"],
      highlights: [
        "Mobile-friendly interface built with reusable and responsive React Native components",
        "Firebase integration for real-time health data sync and persistent information storage",
        "Comprehensive health guide and wellness information categorized by categories",
        "User-focused navigation engineered for smooth transitions on iOS and Android devices",
        "Offline caching for critical first-aid instructions and emergency advisories",
      ],
      metrics: [
        { label: "Framework", value: "React Native Mobile" },
        { label: "Backend", value: "Firebase Cloud" },
        { label: "Platform", value: "iOS & Android" },
      ],
      githubUrl: "https://github.com",
    },
    {
      id: "food-delivery-app",
      title: "Food Delivery App",
      featured: false,
      category: "Frontend",
      tagline: "Modern food ordering and restaurant browsing web application with cart flow",
      description:
        "A modern food ordering and delivery web application with responsive restaurant and meal cards.",
      fullDescription:
        "An engaging e-commerce food discovery web app featuring smooth menu filtering, dynamic cart calculation, responsive restaurant cards, interactive delivery checkout previews, and clean Tailwind styling.",
      techStack: ["React.js", "Tailwind CSS", "Responsive UI", "Cart State"],
      highlights: [
        "Dynamic food browsing with instant search and category filtering",
        "Responsive restaurant and food cards with ratings, delivery estimates, and prices",
        "Interactive cart experience with real-time item count and subtotal calculations",
        "Modern and clean UI built with reusable React components",
        "Tailwind CSS responsive design tailored seamlessly from mobile to desktop screens",
      ],
      metrics: [
        { label: "Frontend", value: "React.js SPA" },
        { label: "Styling", value: "Tailwind CSS" },
        { label: "State", value: "Interactive Cart Management" },
      ],
      githubUrl: "https://github.com",
      liveDemoUrl: "https://food-delivery-demo.vercel.app",
    },
  ] as ProjectItem[],

  certificate: {
    title: "Full Stack Software Engineering Internship",
    issuer: "Xappo Enterprises",
    field: "Full Stack Software Engineering",
    issueDate: "Internship Completion",
    credentialId: "XE-FSD-2026-LM",
    verificationUrl: "https://xappoenterprises.com/verify",
    pdfPath: "/Laiba_CV.pdf",
    skillsCovered: [
      "Full Stack Development",
      "Modern Web Frameworks",
      "API Integrations",
      "Feature Engineering",
      "Code Review & Version Control",
    ],
    description:
      "Successfully completed rigorous hands-on full stack development engineering experience at Xappo Enterprises, building and improving production-ready application features and collaborating across modern frontend and backend architectures.",
  } as CertificateData,
};
