"use client";

import Link from "next/link";
import { FormEvent, useDeferredValue, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ExerciseDescriptionType } from "../exercises/page";
import { RoutineExercise, saveRoutine } from "../lib/routines";

type DraftExercise = RoutineExercise & { key: string };

type CreateRoutineFormProps = {
  exercises: ExerciseDescriptionType[];
};

const DEFAULT_SETS = 3;
const DEFAULT_REPS = 10;

export default function CreateRoutineForm({ exercises }: CreateRoutineFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [draftExercises, setDraftExercises] = useState<DraftExercise[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(() => {
    if (!deferredQuery) return exercises.slice(0, 40);

    return exercises
      .filter((exercise) => {
        const exerciseName = exercise.name?.toLowerCase() ?? "";
        const mainMuscle = exercise.mainMuscle?.toLowerCase() ?? "";
        return (
          exerciseName.includes(deferredQuery) ||
          mainMuscle.includes(deferredQuery)
        );
      })
      .slice(0, 40);
  }, [exercises, deferredQuery]);

  const addedIds = useMemo(
    () => new Set(draftExercises.map((item) => item.id)),
    [draftExercises]
  );

  const addExercise = (exercise: ExerciseDescriptionType) => {
    const exerciseId = String(exercise.id);
    if (addedIds.has(exerciseId)) return;

    setDraftExercises((prev) => [
      ...prev,
      {
        key: crypto.randomUUID(),
        id:exercise.id,
        name: exercise.name,
        mainMuscle: exercise.mainMuscle,
        equipment: exercise.equipment,
        sets: DEFAULT_SETS,
        reps: DEFAULT_REPS,
      },
    ]);
    setError(null);
  };

  const updateExercise = (
    key: string,
    field: "sets" | "reps",
    value: string
  ) => {
    const parsed = Number(value);
    setDraftExercises((prev) =>
      prev.map((item) =>
        item.key === key
          ? {
              ...item,
              [field]: Number.isFinite(parsed) && parsed > 0 ? parsed : 0,
            }
          : item
      )
    );
  };

  const removeExercise = (key: string) => {
    setDraftExercises((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSave = (event: FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Give your routine a name.");
      return;
    }

    if (draftExercises.length === 0) {
      setError("Add at least one exercise.");
      return;
    }

    const invalid = draftExercises.some(
      (item) => item.sets < 1 || item.reps < 1
    );
    if (invalid) {
      setError("Each exercise needs at least 1 set and 1 rep.");
      return;
    }

    setSaving(true);
    saveRoutine({
      name: name.trim(),
      exercises: draftExercises.map(
        ({ id, name, mainMuscle, equipment, sets, reps }) => ({
          id,
          name,
          mainMuscle,
          equipment,
          sets,
          reps,
        })
      ),
    });
    router.push("/workouts");
  };

  return (
    <main className="flex flex-1 flex-col px-4 py-4 md:px-8 md:py-6">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-neutral-50 md:text-xl">
            Create Routine
          </h1>
          <p className="text-xs text-neutral-500 md:text-sm">
            Add exercises with sets and reps to reuse later
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/workouts"
            className="inline-flex h-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 px-3 text-xs font-medium text-neutral-300 transition hover:border-neutral-700 hover:text-neutral-100"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form="create-routine-form"
            disabled={saving}
            className="inline-flex h-9 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save routine"}
          </button>
        </div>
      </header>

      <form
        id="create-routine-form"
        onSubmit={handleSave}
        className="flex flex-col gap-6"
      >
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5">
          <label
            htmlFor="routine-name"
            className="mb-1.5 block text-xs font-medium text-neutral-400"
          >
            Routine name
          </label>
          <input
            id="routine-name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setError(null);
            }}
            placeholder="e.g. Upper Body Strength"
            className="h-10 w-full max-w-lg rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/40"
          />
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold tracking-tight text-neutral-50">
                Add exercises
              </h2>
              <p className="mt-0.5 text-xs text-neutral-500">
                Search by name or body part, then add to the routine
              </p>
            </div>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search exercises…"
              className="mb-3 h-9 w-full rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 text-xs text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/40"
            />

            <ul className="max-h-96 divide-y divide-neutral-800 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-950/40">
              {filtered.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-neutral-500">
                  No exercises found.
                </li>
              ) : (
                filtered.map((exercise) => {
                  const exerciseId = String(exercise.id);
                  const alreadyAdded = addedIds.has(exerciseId);

                  return (
                    <li
                      key={exerciseId}
                      className="flex items-center justify-between gap-3 px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-neutral-100">
                          {exercise.name}
                        </div>
                        <div className="mt-0.5 text-xs text-neutral-500">
                          {exercise.mainMuscle}
                          {exercise.equipment ? ` · ${exercise.equipment}` : ""}
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={alreadyAdded}
                        onClick={() => addExercise(exercise)}
                        className="shrink-0 rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-emerald-500/40 hover:text-emerald-200 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {alreadyAdded ? "Added" : "Add"}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </section>

          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-neutral-50">
                  Routine exercises
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {draftExercises.length === 0
                    ? "No exercises yet"
                    : `${draftExercises.length} exercise${draftExercises.length === 1 ? "" : "s"}`}
                </p>
              </div>
            </div>

            {draftExercises.length === 0 ? (
              <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-neutral-800 text-sm text-neutral-500">
                Pick exercises from the list to build your routine.
              </div>
            ) : (
              <ul className="space-y-3">
                {draftExercises.map((item, index) => (
                  <li
                    key={item.key}
                    className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-3"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs text-neutral-500">
                          #{index + 1}
                        </div>
                        <div className="truncate text-sm font-medium text-neutral-100">
                          {item.name}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {item.mainMuscle}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExercise(item.key)}
                        className="shrink-0 text-xs text-neutral-500 transition hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor={`sets-${item.key}`}
                          className="text-[11px] font-medium text-neutral-400"
                        >
                          Sets
                        </label>
                        <input
                          id={`sets-${item.key}`}
                          type="number"
                          min={1}
                          value={item.sets || ""}
                          onChange={(event) =>
                            updateExercise(item.key, "sets", event.target.value)
                          }
                          className="h-9 rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 text-sm text-neutral-100 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/40"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor={`reps-${item.key}`}
                          className="text-[11px] font-medium text-neutral-400"
                        >
                          Reps
                        </label>
                        <input
                          id={`reps-${item.key}`}
                          type="number"
                          min={1}
                          value={item.reps || ""}
                          onChange={(event) =>
                            updateExercise(item.key, "reps", event.target.value)
                          }
                          className="h-9 rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 text-sm text-neutral-100 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/40"
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
