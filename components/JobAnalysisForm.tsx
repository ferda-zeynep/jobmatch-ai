"use client";

import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface JobAnalysisFormProps {
  onAnalyze: (data: {
    jobTitle: string;
    company: string;
    jobDescription: string;
  }) => void;
  isLoading: boolean;
}

export function JobAnalysisForm({
  onAnalyze,
  isLoading,
}: JobAnalysisFormProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !company || !jobDescription) return;
    onAnalyze({ jobTitle, company, jobDescription });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
            Company
          </label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Ataccama"
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
            Target Role
          </label>
          <input
            type="text"
            required
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Frontend Developer"
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
          Job Description
        </label>
        <textarea
          required
          rows={7}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste requirements, tech stack, and responsibilities here..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !jobDescription.trim()}
        className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm flex items-center justify-center gap-2 transition"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Agent analyzing requirements & candidate database...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Run Agentic Match Analysis
          </>
        )}
      </button>
    </form>
  );
}
