import { z } from "zod";

export const RequirementMatchSchema = z.object({
  requirement: z.string(),
  status: z.enum(["matched", "partial", "gap"]),
  evidence: z
    .string()
    .describe("Evidence from profile/projects or explanation of gap"),
});

export const RecommendedProjectSchema = z.object({
  projectId: z.string(),
  projectName: z.string(),
  reason: z
    .string()
    .describe(
      "Specific reason why this portfolio project demonstrates capability",
    ),
});

export const FinalAnalysisSchema = z.object({
  matchScore: z.number().min(0).max(100),
  recommendation: z.enum(["strong_match", "moderate_match", "weak_match"]),
  summary: z.string(),
  strengths: z.array(z.string()),
  gaps: z.array(z.string()),
  matchedRequirements: z.array(RequirementMatchSchema),
  recommendedProjects: z.array(RecommendedProjectSchema),
  coverLetter: z.string(),
});

export type FinalAnalysis = z.infer<typeof FinalAnalysisSchema>;
