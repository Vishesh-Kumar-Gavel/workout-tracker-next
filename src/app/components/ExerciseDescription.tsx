import React from "react";
import { ExerciseDescriptionType } from "../exercises/page";

const cleanText = (text: string | null) => {
  if (!text) return "None";
  return text.replace(/,\s*$/, "").trim();
};

export default function ExerciseDescription({
  name,
  mainMuscle,
  difficulty,
  equipment,
  mechanics,
  force,
  utility,
  preparation,
  execution,
  targetMuscle,
  synergistMuscle,
  stabilizerMuscle,
}: ExerciseDescriptionType) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm md:p-8">
      <div className="mb-6 border-b border-zinc-800 pb-6">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-2xl font-bold text-zinc-100">{name}</h2>
          <span className="ml-4 whitespace-nowrap rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-400">
            Level {difficulty}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="rounded-md border border-zinc-700/50 bg-zinc-800 px-2.5 py-0.5 text-sm text-zinc-300">
            {mainMuscle}
          </span>
          <span className="rounded-md border border-zinc-700/50 bg-zinc-800 px-2.5 py-0.5 text-sm text-zinc-300">
            {equipment}
          </span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl border border-zinc-800/50 bg-zinc-950/50 p-4">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Mechanics
          </p>
          <p className="text-sm font-medium text-zinc-300">{mechanics}</p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Force
          </p>
          <p className="text-sm font-medium text-zinc-300">{force}</p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Utility
          </p>
          <p className="text-sm font-medium text-zinc-300">{utility}</p>
        </div>
      </div>

      <div className="mb-6 grow space-y-4">
        <div>
          <h3 className="mb-1 text-sm font-bold text-zinc-100">Preparation</h3>
          <p className="text-sm leading-relaxed text-zinc-400">{preparation}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-bold text-zinc-100">Execution</h3>
          <p className="text-sm leading-relaxed text-zinc-400">{execution}</p>
        </div>
      </div>

      <div className="mt-auto border-t border-zinc-800 pt-6">
        <h3 className="mb-3 text-sm font-bold text-zinc-100">Muscle Anatomy</h3>
        <ul className="space-y-2 text-xs">
          <li className="flex">
            <span className="w-24 font-medium text-zinc-500">Target:</span>
            <span className="text-zinc-300">{cleanText(targetMuscle)}</span>
          </li>
          <li className="flex">
            <span className="w-24 font-medium text-zinc-500">Synergists:</span>
            <span className="text-zinc-300">{cleanText(synergistMuscle)}</span>
          </li>
          <li className="flex">
            <span className="w-24 font-medium text-zinc-500">Stabilizers:</span>
            <span className="text-zinc-300">{cleanText(stabilizerMuscle)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
