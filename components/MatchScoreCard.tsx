import React from "react";

interface MatchScoreCardProps {
  score: number;
  recommendation: "strong_match" | "moderate_match" | "weak_match";
  summary: string;
}

export function MatchScoreCard({
  score,
  recommendation,
  summary,
}: MatchScoreCardProps) {
  const badgeStyles = {
    strong_match:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300",
    moderate_match:
      "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300",
    weak_match:
      "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300",
  }[recommendation];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Match Evaluation
          </span>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
              {score}%
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full border font-semibold capitalize ${badgeStyles}`}
            >
              {recommendation.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3">
        {summary}
      </p>
    </div>
  );
}
