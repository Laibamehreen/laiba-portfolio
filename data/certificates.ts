export interface CertificateItem {
  id: string;
  organization: string;
  location: string;
  title: string;
  role: string;
  status: string;
  date: string;
  duration: string;
  referenceCode?: string;
  signatory: string;
  signatoryTitle: string;
  skills: string[];
  summary: string;
  contributions: {
    number: string;
    title: string;
    detail: string;
  }[];
  filePath: string;
  previewImage: string;
  websiteUrl?: string;
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "xappo-cert",
    organization: "XAPPO Enterprises Ltd.",
    location: "Mosta, Malta",
    title: "Internship Completion Certificate",
    role: "Full-Stack Software Engineering Intern",
    status: "Internship Completed",
    date: "August 04, 2026",
    duration: "6 Weeks",
    referenceCode: "XAPPO-INT-2026-09",
    signatory: "Harro M. Wiersma, M.Sc.",
    signatoryTitle: "Chairman & Founder, XAPPO Enterprises Ltd.",
    skills: [
      "Full-Stack Development",
      "Assessment Design",
      "Backend APIs & Scoring",
      "Frontend Visualisation",
      "Data Governance"
    ],
    summary:
      "Certificate of Internship awarded for successfully completing a 6-week Full-Stack Software Engineering Internship at XAPPO Enterprises Ltd. (Malta), engineering an end-to-end Data Governance Maturity Test.",
    contributions: [
      {
        number: "01",
        title: "Assessment Design",
        detail: "Built a data governance maturity test that evaluates an organisation across multiple governance dimensions and translates responses into a maturity profile and score."
      },
      {
        number: "02",
        title: "Backend Development",
        detail: "Developed the backend of the assessment, including question and scoring logic, the underlying data model, and the APIs capturing and processing responses."
      },
      {
        number: "03",
        title: "Frontend Visualisation",
        detail: "Implemented interactive frontend visualisations that present the maturity results clearly for practitioners and executive stakeholders alike."
      }
    ],
    filePath: "/certificates/xappo-internship-certificate.pdf",
    previewImage: "/certificates/xappo-preview.png",
    websiteUrl: "https://xappo.mt"
  },
  {
    id: "warmbytes-cert",
    organization: "WARMBYTES (PRIVATE) LIMITED",
    location: "Islamabad, Pakistan",
    title: "Certificate of Internship Completion",
    role: "Java Developer / Intern",
    status: "Internship Completed",
    date: "September 07, 2026",
    duration: "6 Weeks (Commenced July 23, 2026)",
    signatory: "Mahnoor Aftab",
    signatoryTitle: "HR, Warmbytes (Private Limited)",
    skills: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "REST APIs",
      "PostgreSQL",
      "Layered Architecture"
    ],
    summary:
      "Official certificate certifying successful completion of a 6-week software engineering internship commencing July 23, 2026, demonstrating professionalism, dedication, and backend engineering contributions.",
    contributions: [
      {
        number: "01",
        title: "RESTful API Engineering",
        detail: "Engineered scalable REST endpoints with clean HTTP semantics, structured error interceptors, and DTO request validation."
      },
      {
        number: "02",
        title: "Layered Backend Architecture",
        detail: "Structured modular backend logic separating concerns across Controllers, Services, Repositories, and Entities."
      },
      {
        number: "03",
        title: "Database Integration",
        detail: "Integrated relational data persistence with Spring Data JPA and query handling for backend business logic."
      }
    ],
    filePath: "/certificates/warmbytes-internship-certificate.pdf",
    previewImage: "/certificates/warmbytes-preview.png",
    websiteUrl: "https://www.warmbytes.com"
  }
];
