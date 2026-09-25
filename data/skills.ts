export interface SkillCategory {
  title: string;
  categoryKey: "backend" | "frontend" | "databases";
  description: string;
  iconName: string;
  skills: {
    name: string;
    description?: string;
    level?: string;
  }[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Backend Core",
    categoryKey: "backend",
    description: "Enterprise Java backend architecture, REST API design, JPA data layer, and secure integrations.",
    iconName: "Server",
    skills: [
      { name: "Java", description: "OOP principles, collections, multithreading, and enterprise backend engineering" },
      { name: "Spring Boot", description: "Rapid backend microservices, autoconfiguration, dependency injection" },
      { name: "Spring Data JPA", description: "Relational entity mapping, repositories, transaction management" },
      { name: "Spring Security", description: "Authentication flows, role-based authorization, request interceptors" },
      { name: "REST APIs", description: "HTTP semantics, status codes, DTO contracts, structured error handling" }
    ]
  },
  {
    title: "Frontend & UI",
    categoryKey: "frontend",
    description: "Modern, component-driven user interfaces and high-performance web applications.",
    iconName: "Layout",
    skills: [
      { name: "React", description: "Declarative component patterns, custom hooks, and dynamic UI state" },
      { name: "Next.js", description: "App Router, server components, client interactivity, and performance optimization" },
      { name: "HTML5 & CSS3", description: "Semantic markup, responsive layouts, accessibility standards" },
      { name: "Tailwind CSS", description: "Utility-first responsive design, modern design tokens, dark themes" }
    ]
  },
  {
    title: "Databases & Tooling",
    categoryKey: "databases",
    description: "Relational and document storage solutions with modern engineering workflows.",
    iconName: "Database",
    skills: [
      { name: "PostgreSQL", description: "Relational schema design, SQL querying, constraints, and data integrity" },
      { name: "MongoDB", description: "NoSQL document collections, dynamic indexing, and flexible data models" },
      { name: "Git & GitHub", description: "Branching workflows, version control discipline, and code reviews" },
      { name: "Agile / Scrum", description: "Iterative sprint cycles, issue tracking, and collaborative delivery" }
    ]
  }
];
