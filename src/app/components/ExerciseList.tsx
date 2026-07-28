"use client";

import { useDeferredValue, useMemo, useState } from "react";
import ExerciseDescription from "./ExerciseDescription";
import { ExerciseDescriptionType } from "../exercises/page";

const PAGE_SIZE = 8;

type ExerciseListProps = {
  exercises: ExerciseDescriptionType[];
};

export default function ExerciseList({ exercises }: ExerciseListProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(() => {
    if (!deferredQuery) return exercises;

    return exercises.filter((exercise) => {
      const name = exercise.name?.toLowerCase() ?? "";
      const mainMuscle = exercise.mainMuscle?.toLowerCase() ?? "";
      return name.includes(deferredQuery) || mainMuscle.includes(deferredQuery);
    });
  }, [exercises, deferredQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const selected =
    exercises.find((exercise) => exercise.id === selectedId) ?? null;

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <main className="flex flex-1 flex-col px-4 py-4 md:px-8 md:py-6">
      <header className="mb-6">
        <h1 className="text-lg font-semibold tracking-tight text-neutral-50 md:text-xl">
          Exercises
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {filtered.length === exercises.length
            ? `${exercises.length} exercises`
            : `${filtered.length} of ${exercises.length} exercises`}{" "}
          — select one to view details
        </p>
      </header>

      <div className="mb-4 w-full lg:max-w-md">
        <label htmlFor="exercise-search" className="sr-only">
          Search exercises
        </label>
        <input
          id="exercise-search"
          type="search"
          value={query}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Search by name or body part…"
          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none transition focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/30"
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex w-full flex-col lg:max-w-md lg:shrink-0">
          <ul className="divide-y divide-neutral-800 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40">
            {pageItems.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-neutral-500">
                No exercises match “{query.trim()}”.
              </li>
            ) : (
              pageItems.map((exercise) => {
                const isSelected = exercise.id === selectedId;

                return (
                  <li key={exercise.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedId(isSelected ? null : exercise.id)
                      }
                      className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-neutral-900/80 ${
                        isSelected
                          ? "bg-neutral-900 ring-1 ring-inset ring-emerald-500/40"
                          : ""
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-neutral-100">
                          {exercise.name}
                        </div>
                        <div className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-neutral-500">
                          <span>{exercise.mainMuscle}</span>
                          <span aria-hidden="true">·</span>
                          <span>{exercise.equipment}</span>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-md border border-neutral-700/50 bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
                        Lvl {exercise.difficulty}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          {filtered.length > 0 && (
            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-neutral-500">
              <span>
                {pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-neutral-300 transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="min-w-16 text-center text-neutral-400">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-neutral-300 transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {selected ? (
            <ExerciseDescription {...selected} />
          ) : (
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-neutral-800 text-sm text-neutral-500 lg:h-full lg:min-h-64">
              Select an exercise to see preparation, execution, and muscle details.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
