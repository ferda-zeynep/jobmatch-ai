import { GoogleGenerativeAI } from "@google/generative-ai";
import { agentToolDeclarations, executeTool } from "./tools";
import { FinalAnalysisSchema, FinalAnalysis } from "./schema";

export interface ActivityEvent {
  step: number;
  description: string;
  type: "tool_call" | "analysis";
  timestamp: string;
}

const SYSTEM_PROMPT = `You are JobMatch AI, an expert agentic career assistant.
Your goal is to evaluate a candidate against a job opportunity.

CRITICAL INSTRUCTIONS:
1. Do not assume or hallucinate candidate skills. Use the provided tools (getCandidateProfile, getSkills, getProjects, getExperience) to retrieve factual candidate data.
2. Determine which tools you need based on the job requirements.
3. Compare requirements against candidate skills and projects.
4. Calculate a matchScore (0-100), classify recommendation ('strong_match' | 'moderate_match' | 'weak_match'), identify matched/partial/gap requirements, select best portfolio projects, and draft a tailored cover letter.
5. When finished, return ONLY a valid JSON object strictly adhering to this structure:
{
  "matchScore": number,
  "recommendation": "strong_match" | "moderate_match" | "weak_match",
  "summary": "string",
  "strengths": ["string"],
  "gaps": ["string"],
  "matchedRequirements": [{"requirement": "string", "status": "matched"|"partial"|"gap", "evidence": "string"}],
  "recommendedProjects": [{"projectId": "string", "projectName": "string", "reason": "string"}],
  "coverLetter": "string"
}
Do NOT wrap in markdown fences or add explanatory text outside JSON.`;

export async function runJobMatchAgent(
  jobTitle: string,
  company: string,
  jobDescription: string,
): Promise<{ analysis: FinalAnalysis; activityLog: ActivityEvent[] }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    throw new Error("GEMINI_API_KEY environment variable is missing.");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const chat = model.startChat({
    tools: [{ functionDeclarations: agentToolDeclarations }],
  });

  const activityLog: ActivityEvent[] = [];
  const maxIterations = 6;
  let iterations = 0;

  const prompt = `Job Title: ${jobTitle}\nCompany: ${company}\nJob Description:\n${jobDescription}`;
  let result = await chat.sendMessage(prompt);
  let response = result.response;

  while (iterations < maxIterations) {
    iterations++;
    const functionCalls = response.functionCalls();

    if (!functionCalls || functionCalls.length === 0) {
      const rawText = response.text().trim();
      const cleanJson = rawText.replace(/^```json\s*|\s*```$/g, "").trim();
      const parsed = FinalAnalysisSchema.parse(JSON.parse(cleanJson));

      activityLog.push({
        step: activityLog.length + 1,
        description:
          "Generated final match evaluation and tailored cover letter",
        type: "analysis",
        timestamp: new Date().toISOString(),
      });

      return { analysis: parsed, activityLog };
    }

    for (const call of functionCalls) {
      activityLog.push({
        step: activityLog.length + 1,
        description: `Queried database via tool: ${call.name}`,
        type: "tool_call",
        timestamp: new Date().toISOString(),
      });

      const toolResult = await executeTool(
        call.name,
        (call.args as Record<string, any>) || {},
      );

      const sendResult = await chat.sendMessage([
        {
          functionResponse: {
            name: call.name,
            response: { result: toolResult },
          },
        },
      ]);
      response = sendResult.response;
    }
  }

  throw new Error("Agent exceeded iteration limit without finishing.");
}
