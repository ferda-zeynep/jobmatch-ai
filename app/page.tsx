"use client";

import React, { useState } from "react";
import { JobAnalysisForm } from "@/components/JobAnalysisForm";
import { MatchScoreCard } from "@/components/MatchScoreCard";
import { ActivityFeed, ActivityEvent } from "@/components/ActivityFeed";
import { FinalAnalysis } from "@/lib/ai/schema";
import { Copy, Check, Briefcase } from "lucide-react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<FinalAnalysis | null>(null);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async (payload: {
    jobTitle: string;
    company: string;
    jobDescription: string;
  }) => {
    setIsLoading(true);
    setAnalysis(null);
    setActivity([]);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");

      setAnalysis(data.analysis);
      setActivity(data.activityLog || []);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyCoverLetter = () => {
    if (!analysis?.coverLetter) return;
    navigator.clipboard.writeText(analysis.coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            JobMatch AI
          </h1>
          <p className="text-sm text-zinc-500">
            Autonomous ReAct Career & Matching Agent
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <JobAnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />
          {activity.length > 0 && <ActivityFeed events={activity} />}
        </div>

        <div className="space-y-6">
          {analysis ? (
            <>
              <MatchScoreCard
                score={analysis.matchScore}
                recommendation={analysis.recommendation}
                summary={analysis.summary}
              />

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Cover Letter
                  </h3>
                  <button
                    onClick={copyCoverLetter}
                    className="text-xs text-blue-600 hover:text-blue-500 flex items-center gap-1 font-medium"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="text-xs text-zinc-700 dark:text-zinc-300 whitespace-pre-line font-sans max-h-72 overflow-y-auto leading-relaxed">
                  {analysis.coverLetter}
                </div>
              </div>
            </>
          ) : (
            <div className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 text-center text-zinc-400 text-sm">
              Paste a role description to execute candidate tool retrieval and
              matching.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
