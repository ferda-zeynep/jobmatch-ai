import { NextResponse } from "next/server";
import { runJobMatchAgent } from "@/lib/ai/agent";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const { jobTitle, company, jobDescription } = await req.json();

    if (!jobTitle || !company || !jobDescription) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { analysis, activityLog } = await runJobMatchAgent(
      jobTitle,
      company,
      jobDescription,
    );

    const savedApplication = await prisma.jobApplication.create({
      data: {
        jobTitle,
        company,
        jobDescription,
        matchScore: analysis.matchScore,
        recommendation: analysis.recommendation,
        summary: analysis.summary,
        strengths: analysis.strengths,
        gaps: analysis.gaps,
        matchedReqs: analysis.matchedRequirements as any,
        selectedProjects: analysis.recommendedProjects as any,
        coverLetter: analysis.coverLetter,
      },
    });

    return NextResponse.json({
      success: true,
      applicationId: savedApplication.id,
      analysis,
      activityLog,
    });
  } catch (error: any) {
    console.error("Agent error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze job" },
      { status: 500 },
    );
  }
}
