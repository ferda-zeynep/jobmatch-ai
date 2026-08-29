import React from "react";
import { CheckCircle2, Database, Bot } from "lucide-react";

export interface ActivityEvent {
  step: number;
  description: string;
  type: "tool_call" | "analysis";
  timestamp: string;
}

export function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  if (events.length === 0) return null;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
        <Bot className="w-4 h-4 text-blue-500" />
        Agent Execution Trail
      </h3>
      <div className="space-y-2">
        {events.map((ev, i) => (
          <div key={i} className="flex items-start gap-2.5 text-xs">
            {ev.type === "tool_call" ? (
              <Database className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
            )}
            <span className="text-zinc-700 dark:text-zinc-300 font-mono">
              {ev.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
