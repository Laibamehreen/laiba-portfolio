export interface ProjectItem {
  id: string;
  title: string;
  category: "Java / Backend" | "Full Stack" | "Frontend" | "Mobile" | "AI";
  techStackSummary: string;
  shortDescription: string;
  detailedDescription?: string;
  technologies: string[];
  image: string;
  previewImage?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  featured?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "inventory-management-system",
    title: "Inventory Management System",
    category: "Java / Backend",
    techStackSummary: "Java · Spring Boot · REST APIs",
    shortDescription:
      "Developed a comprehensive backend system for managing stock inventories, product catalogs, supplier records, and business transactions through secure RESTful endpoints.",
    detailedDescription:
      "Engineered with strict separation of concerns across Controllers, Services, Repositories, Entities, and DTOs using Java and Spring Boot. Includes secure RESTful endpoints, transactional safety, and Spring Data JPA integration.",
    technologies: ["Java", "Spring Boot", "REST APIs", "Spring Data JPA", "PostgreSQL"],
    image: "/projects/inventory-management.jpg",
    previewImage: "/projects/inventory-management.jpg",
    githubUrl: "https://github.com/Laibamehreen/inventory-management-system",
    liveDemoUrl: "https://inventory-mgt-system-demo.vercel.app",
    featured: true
  },
  {
    id: "ai-career-advisor",
    title: "AI Career Advisor",
    category: "AI",
    techStackSummary: "Next.js · Tailwind CSS · AI · Vercel",
    shortDescription:
      "Built an interactive career guidance web platform featuring an AI conversational chatbot and a responsive Next.js interface for personalized career recommendations.",
    detailedDescription:
      "Interactive student career advisor powered by AI conversation algorithms, responsive Next.js App Router architecture, and tailored Tailwind styling for real-time guidance.",
    technologies: ["Next.js", "Tailwind CSS", "AI", "TypeScript", "Vercel"],
    image: "/projects/ai-career-advisor.jpg",
    previewImage: "/projects/ai-career-advisor.jpg",
    githubUrl: "https://github.com/Laibamehreen/ai-career-advisor",
    liveDemoUrl: "https://ai-career-advisor-demo.vercel.app",
    featured: true
  },
  {
    id: "data-governance-maturity-assessment",
    title: "Data Governance Maturity Assessment",
    category: "Full Stack",
    techStackSummary: "Next.js · React · REST APIs · Vercel",
    shortDescription:
      "Engineered an interactive enterprise assessment platform evaluating multi-dimensional data governance maturity, question scoring algorithms, and dynamic visual reporting (built for XAPPO Enterprises).",
    detailedDescription:
      "Full-stack maturity assessment suite covering both backend logic and frontend visualizations for executive and practitioner data governance evaluation.",
    technologies: ["Next.js", "React", "REST APIs", "TypeScript", "Vercel"],
    image: "/projects/data-governance.jpg",
    previewImage: "/projects/data-governance.jpg",
    githubUrl: "https://github.com/Laibamehreen/data-governance-maturity-assessment",
    liveDemoUrl: "https://data-governance-assessment.vercel.app",
    featured: true
  },
  {
    id: "hospital-management-system",
    title: "Hospital Management System",
    category: "Full Stack",
    techStackSummary: "ReactJS · MongoDB · Node.js",
    shortDescription:
      "Engineered a full-stack healthcare web portal for organizing patient registrations, appointments, medical records, and clinical administrative workflows.",
    detailedDescription:
      "Full-stack healthcare management application built with ReactJS frontend interfaces and MongoDB document storage to streamline hospital administrative workflows.",
    technologies: ["ReactJS", "MongoDB", "Node.js", "REST APIs"],
    image: "/projects/hospital-management.jpg",
    previewImage: "/projects/hospital-management.jpg",
    githubUrl: "https://github.com/Laibamehreen/hospital-management-system",
    liveDemoUrl: "https://hospital-mgt-system-demo.vercel.app",
    featured: true
  },
  {
    id: "health-guide-app",
    title: "Health Guide App",
    category: "Mobile",
    techStackSummary: "React · Firebase · Mobile Web · Vercel",
    shortDescription:
      "Cross-platform mobile and web wellness application delivering structured health advice, symptom guides, and realtime synchronization via Firebase.",
    technologies: ["React", "Firebase", "Mobile UI", "Tailwind CSS", "Vercel"],
    image: "/projects/health-guide.jpg",
    previewImage: "/projects/health-guide.jpg",
    githubUrl: "https://github.com/Laibamehreen/health-guide-app",
    liveDemoUrl: "https://health-guide-app-demo.vercel.app",
    featured: false
  },
  {
    id: "food-delivery-app",
    title: "Food Delivery App",
    category: "Frontend",
    techStackSummary: "React · Tailwind CSS",
    shortDescription:
      "Interactive food ordering and restaurant discovery web application featuring dynamic category filters, item cards, and smooth cart state management.",
    technologies: ["React", "Tailwind CSS", "Responsive UI", "Cart State"],
    image: "/projects/food-delivery.jpg",
    previewImage: "/projects/food-delivery.jpg",
    githubUrl: "https://github.com/Laibamehreen/food-delivery-app",
    liveDemoUrl: "https://food-delivery-demo.vercel.app",
    featured: false
  }
];
