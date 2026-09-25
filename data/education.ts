export interface EducationItem {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  status: string;
  expectedGraduation: string;
  cgpa: string;
  description: string;
  focusAreas: string[];
  keyCoursework: string[];
}

export const EDUCATION_DATA: EducationItem = {
  institution: "COMSATS University",
  degree: "BS in Computer Science",
  fieldOfStudy: "Computer Science",
  status: "Currently Pursuing • Expected 2028",
  expectedGraduation: "Expected 2028",
  cgpa: "3.75 / 4.00",
  description:
    "Pursuing Bachelor of Science in Computer Science with a strong academic standing (CGPA: 3.75 / 4.00) and practical software engineering experience in Java, Spring Boot, REST APIs, database architecture, React, and Next.js.",
  focusAreas: [
    "Data Structures",
    "OOP (Java)",
    "Database Systems",
    "Web Tech",
    "Software Engineering"
  ],
  keyCoursework: [
    "Data Structures",
    "OOP (Java)",
    "Database Systems",
    "Web Tech",
    "Software Engineering"
  ]
};
