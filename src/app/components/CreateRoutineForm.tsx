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

  const addedExerciseIds= useMemo(
    ()=> new Set(draftExercises.map((e)=>String(e.id)))
    ,[draftExercises]
  );
  
  const filtered = useMemo(() => {
    if (!deferredQuery) {
      const selectedSet = new Set(draftExercises.map((e)=>e.id));

      const selectedExercises = exercises.filter((e)=>selectedSet.has(e.id));
      const notSelectedExercises = exercises.filter((e)=>!selectedSet.has(e.id));
      return [...selectedExercises,...notSelectedExercises];
    }

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
  }, [exercises, deferredQuery,draftExercises]);

  const addExercise = (exercise: ExerciseDescriptionType) => {
    console.log("Inside add Exercise");
    const exerciseIdStr = String(exercise.id);
    if(addedExerciseIds.has(exerciseIdStr)){
      console.log("Remove Exercise");
      setDraftExercises((prev)=> prev.filter((e)=>e.id!=exerciseIdStr))
    }
    else{
      setDraftExercises((prev)=>[
        ...prev,
        {
          ...exercise,
          id: exercise.id,
          key: `${exercise.id}-${Date.now()}`,
          sets: DEFAULT_SETS,
          reps: DEFAULT_REPS,
        },
      ])
    }
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
    console.log("save routine!")
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
                  const isAdded = addedExerciseIds.has(exerciseId);
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
                        onClick={() => addExercise(exercise)}
                        className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                          isAdded
                            ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-300 cursor-default"
                            : "border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-emerald-500/40 hover:text-emerald-200"
                        }`}
                      >
                        {isAdded ? "Added" : "Add"}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
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
