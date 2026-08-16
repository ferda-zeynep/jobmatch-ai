import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.jobApplication.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.candidateProfile.deleteMany();

  await prisma.candidateProfile.create({
    data: {
      name: "Alex Novak",
      email: "alex.novak@example.com",
      title: "Frontend & Informatics Developer",
      summary:
        "Final-year Informatics student with a strong foundation in React, TypeScript, Next.js, and modern AI agent workflows.",
      location: "Prague, Czechia",
      yearsOfExperience: 2,
      githubUrl: "https://github.com/alexnovak",
      linkedinUrl: "https://linkedin.com/in/alexnovak",
    },
  });

  await prisma.skill.createMany({
    data: [
      {
        name: "React",
        category: "Frontend",
        proficiency: "Advanced",
        yearsOfExperience: 3,
      },
      {
        name: "TypeScript",
        category: "Languages",
        proficiency: "Advanced",
        yearsOfExperience: 2,
      },
      {
        name: "Next.js",
        category: "Frontend",
        proficiency: "Intermediate",
        yearsOfExperience: 2,
      },
      {
        name: "Tailwind CSS",
        category: "Frontend",
        proficiency: "Advanced",
        yearsOfExperience: 2,
      },
      {
        name: "PostgreSQL",
        category: "Backend",
        proficiency: "Intermediate",
        yearsOfExperience: 2,
      },
      {
        name: "Prisma",
        category: "Backend",
        proficiency: "Intermediate",
        yearsOfExperience: 2,
      },
      {
        name: "REST APIs",
        category: "Backend",
        proficiency: "Advanced",
        yearsOfExperience: 3,
      },
      {
        name: "AI/LLM APIs",
        category: "AI Engineering",
        proficiency: "Intermediate",
        yearsOfExperience: 1,
      },
      {
        name: "Vitest / RTL",
        category: "Testing",
        proficiency: "Intermediate",
        yearsOfExperience: 1,
      },
      {
        name: "Git",
        category: "Tools",
        proficiency: "Advanced",
        yearsOfExperience: 3,
      },
    ],
  });

  await prisma.project.createMany({
    data: [
      {
        name: "Watchtower",
        description:
          "A full-stack observability platform for tracking system metrics and logs in real time.",
        technologies: [
          "React",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "Tailwind CSS",
        ],
        features: [
          "Live status dashboards",
          "Custom alert thresholds",
          "Log aggregation pipeline",
        ],
        relevance:
          "Full-stack web application architecture and telemetry integration.",
      },
      {
        name: "GenContent",
        description:
          "An AI-powered content generation SaaS application with structured templates.",
        technologies: [
          "Next.js",
          "TypeScript",
          "Prisma",
          "PostgreSQL",
          "Gemini API",
          "Tailwind CSS",
        ],
        features: [
          "Structured prompt output",
          "Template management",
          "Usage tracking",
        ],
        relevance:
          "Direct experience integrating LLM APIs and structured server-side data processing.",
      },
      {
        name: "AI Resume Builder",
        description:
          "An AI-assisted resume creation application that tailors content based on target job titles.",
        technologies: ["React", "TypeScript", "Zod", "Tailwind CSS"],
        features: [
          "Dynamic form validation with Zod",
          "AI bullet point refinement",
          "Export to PDF",
        ],
        relevance:
          "High emphasis on complex client-side forms and LLM-assisted text refinement.",
      },
      {
        name: "RoomMatch Prague",
        description:
          "A mobile-first platform helping Erasmus students and expats find flatmates and accommodation in Prague.",
        technologies: ["React", "JavaScript", "REST APIs", "Tailwind CSS"],
        features: [
          "Interactive listing search",
          "Preference-based filtering",
          "User profile management",
        ],
        relevance:
          "User-centric UI design and responsive web application layout.",
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
