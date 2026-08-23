import { FunctionDeclaration, SchemaType } from "@google/generative-ai";
import { prisma } from "../db/prisma";

export const agentToolDeclarations: FunctionDeclaration[] = [
  {
    name: "getCandidateProfile",
    description:
      "Retrieves candidate summary, title, experience level, and contact info.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
    },
  },
  {
    name: "getSkills",
    description:
      "Returns the candidate's skills categorized with proficiency levels and experience years.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
    },
  },
  {
    name: "getProjects",
    description:
      "Returns all portfolio projects including tech stack, features, and key highlights.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
    },
  },
  {
    name: "getExperience",
    description:
      "Returns candidate work, internship, or academic project experience history.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
    },
  },
];

export async function executeTool(
  name: string,
  args: Record<string, any>,
): Promise<any> {
  switch (name) {
    case "getCandidateProfile": {
      const profile = await prisma.candidateProfile.findFirst();
      return profile || { error: "No profile found" };
    }
    case "getSkills": {
      const skills = await prisma.skill.findMany();
      return skills;
    }
    case "getProjects": {
      const projects = await prisma.project.findMany();
      return projects;
    }
    case "getExperience": {
      const experience = await prisma.experience.findMany();
      return experience;
    }
    default:
      return { error: `Tool ${name} is not recognized.` };
  }
}
