export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  location: string;
  duration: string;
  highlights: string[];
  technologies: string[];
  certificateUrl: string;
  badge?: string;
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "warmbytes",
    organization: "Warmbytes Private Limited",
    role: "Java Developer Intern",
    location: "Islamabad, Pakistan",
    duration: "6-Week Internship (Jul – Sep 2026)",
    highlights: [
      "Worked on Java and Spring Boot backend development.",
      "Built and integrated REST APIs.",
      "Worked with Spring Data JPA and database operations."
    ],
    technologies: ["Java", "Spring Boot", "Spring Data JPA", "REST APIs", "PostgreSQL"],
    certificateUrl: "/certificates/warmbytes-internship-certificate.pdf",
    badge: "Verified Credential"
  },
  {
    id: "xappo-enterprises",
    organization: "Xappo Enterprises",
    role: "Full Stack Developer Intern",
    location: "Mosta, Malta",
    duration: "6-Week Internship (Jun – Aug 2026)",
    highlights: [
      "Developed responsive web applications.",
      "Built frontend features using React and Next.js.",
      "Integrated frontend applications with backend APIs."
    ],
    technologies: ["React", "Next.js", "REST APIs", "Git", "GitHub"],
    certificateUrl: "/certificates/xappo-internship-certificate.pdf",
    badge: "Ref: XAPPO-INT-2026-09"
  }
];
