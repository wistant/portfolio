import { CodeXmlIcon, CpuIcon } from "lucide-react"

import type { Experience } from "@/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "unity-link",
    companyName: "Unity Link",
    companyLogo: "/experiences/unity-link.jpg",
    positions: [
      {
        id: "1",
        title: "Professional Backend & Full-Stack Intern",
        employmentPeriod: {
          start: "01.2026",
          end: "05.2026",
        },
        employmentType: "Internship",
        icon: <CpuIcon />,
        description: `- Engineered high-performance, robust REST and GraphQL APIs using NestJS and TypeScript.
- Adhered strictly to SOLID principles, design patterns (Factory, Dependency Injection, Repository, and Singleton), and clean modular architectures.
- Designed scalable database architectures, optimized complex SQL queries, and handled migrations and schema designs using Prisma and TypeORM.
- Engineered sleek, dynamic, and responsive front-end dashboard panels and server-side rendered pages using Next.js.`,
        skills: [
          "TypeScript",
          "NestJS",
          "Next.js",
          "SQL",
          "Prisma",
          "TypeORM",
          "SOLID Principles",
          "Design Patterns",
          "REST APIs",
          "GraphQL",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "devia-technologies",
    companyName: "Devia Technologies",
    companyLogo: "/experiences/devia.jpg",
    positions: [
      {
        id: "1",
        title: "Front-End & API Developer",
        employmentPeriod: {
          start: "05.2024",
          end: "12.2025",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: `- Developed highly interactive, responsive, and cross-browser compatible user interfaces using HTML/CSS and vanilla JavaScript.
- Deployed dynamic front-end scripts, optimized page rendering speed, and handled complex DOM manipulation and state management.
- Architected and built lightweight, fast, and scalable REST APIs using raw (brut) Node.js and Express without heavy external framework abstractions.
- Integrated third-party APIs and orchestrated seamless client-server data flows.`,
        skills: [
          "JavaScript",
          "HTML5",
          "CSS3",
          "DOM Manipulation",
          "Node.js",
          "Express",
          "REST APIs",
          "Web Performance",
          "API Integration",
        ],
        isExpanded: true,
      },
    ],
  },
]
