export interface ProfileData {
  name: string;
  fullName: string;
  shortName: string;
  title: string;
  roleSubtitle: string;
  intro: string;
  bio: string[];
  education: {
    institution: string;
    degree: string;
    status: string;
    expectedGraduation: string;
    keyCoursework: string[];
  };
  coreStrengths: string[];
  email: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
  cvPdfUrl: string;
  image: string;
  location: string;
}

export const PROFILE_DATA: ProfileData = {
  name: "Laiba Mehreen",
  fullName: "Laiba Mehreen",
  shortName: "Laiba",
  title: "Software Engineer",
  roleSubtitle: "Java · Spring Boot · REST APIs",
  intro:
    "BSCS student at COMSATS University with practical software engineering experience in Java, Spring Boot, REST APIs, database architecture, React, and Next.js through internships and production-focused projects. Dedicated to engineering resilient backend systems, scalable APIs, and clean full-stack web applications.",
  bio: [
    "BSCS student at COMSATS University with practical software engineering experience in Java, Spring Boot, REST APIs, database architecture, React, and Next.js.",
    "Proven experience through hands-on internships at Warmbytes Private Limited and Xappo Enterprises, building core backend features, robust RESTful APIs, data persistence with Spring Data JPA, and interactive web interfaces.",
    "Dedicated to engineering resilient backend systems, scalable APIs, object-oriented architectures, and clean full-stack web applications."
  ],
  education: {
    institution: "COMSATS University",
    degree: "BS in Computer Science",
    status: "Currently Pursuing • Expected 2028",
    expectedGraduation: "Expected 2028",
    keyCoursework: [
      "Data Structures",
      "OOP (Java)",
      "Database Systems",
      "Web Tech",
      "Software Engineering"
    ]
  },
  coreStrengths: [
    "RESTful API Architecture",
    "Object-Oriented Design",
    "Microservices Concepts",
    "Relational Data Modeling"
  ],
  email: "laibamehreenk@gmail.com",
  github: "https://github.com/Laibamehreen",
  githubHandle: "Laibamehreen",
  linkedin: "https://linkedin.com/in/laiba-mehreen",
  linkedinHandle: "in/laiba-mehreen",
  cvPdfUrl: "/Laiba_CV.pdf",
  image: "/pic.png",
  location: "Punjab, Pakistan"
};
