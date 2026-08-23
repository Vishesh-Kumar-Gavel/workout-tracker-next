"use client"
import { ADD_DETAILS_KEY, DRAFT_EXERCISES_KEY, DraftExercise, ROUTINE_NAME_KEY } from "../create-routine/page"
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import WeightedExerciseSetsTable from "./WeightedExerciseSetsTable";
import { Routine, saveRoutine } from "../lib/routines";

type CreateRoutineDetailsFormProps = {
  draftExercises: DraftExercise[],
  setDraftExercises: React.Dispatch<React.SetStateAction<DraftExercise[]>>,
  name: string | any,
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAddDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateRoutineDetailsForm({ draftExercises, setDraftExercises, name, setName, setAddDetails }: CreateRoutineDetailsFormProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, [])
  function handleSave(){
    const routine : Omit<Routine, "id" | "createdAt"> = {
      name : name,
      exercises : draftExercises
    }
    saveRoutine(routine);
  }
  return (
    <main className="flex flex-1 flex-col px-4 py-4 md:px-8 md:py-6">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-neutral-50 md:text-xl">
            {name} Routine
          </h1>
          <p className="text-xs text-neutral-500 md:text-sm">
            Add exercises with sets and reps to reuse later
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/workouts"
            onClick={()=>{
              sessionStorage.removeItem(DRAFT_EXERCISES_KEY);
              sessionStorage.removeItem(ADD_DETAILS_KEY);
              sessionStorage.removeItem(ROUTINE_NAME_KEY);
            }}
            className="inline-flex h-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 px-3 text-xs font-medium text-neutral-300 transition hover:border-neutral-700 hover:text-neutral-100"
          >
            Cancel
          </Link>
          <Link
            type="submit"
            href = "/workouts"
            onClick={()=>{
                sessionStorage.removeItem(DRAFT_EXERCISES_KEY);
                sessionStorage.removeItem(ADD_DETAILS_KEY);
                sessionStorage.removeItem(ROUTINE_NAME_KEY);
                handleSave();
              }
            }
            className="inline-flex h-9 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20 disabled:opacity-50"
          >
            Create Routine
          </Link>
        </div>
      </header>
      <div>
        {
          isMounted ? <ul className="divide-y divide-neutral-800 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-950/40">
            {draftExercises.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-neutral-500">
                No exercises found.
              </li>
            ) : (
              draftExercises.map((exercise) => {
                const exerciseId = String(exercise.id);
                return (
                  <li
                    key={exerciseId}
                    className="flex items-center justify-between gap-3 px-3 py-2.5"
                  >
                    <div className="min-w-0 ">
                      <div className="truncate text-sm font-medium text-neutral-100">
                        {exercise.name}
                      </div>
                      <div className="mt-0.5 text-xs text-neutral-500">
                        {exercise.mainMuscle}
                        {exercise.equipment ? ` · ${exercise.equipment}` : ""}
                      </div>

                      <WeightedExerciseSetsTable exercise={exercise} draftExercises={draftExercises} setDraftExercises={setDraftExercises} />

                    </div>
                  </li>
                );
              })
            )}
          </ul> :
            <ul>
              <ul className="divide-y">
                <li className="px-4 py-8 text-center text-sm text-neutral-500">
                  Loading exercises...
                </li>
              </ul>
            </ul>
        }

        <button
          type="submit"
          form="create-routine-form"
          onClick={() => { setAddDetails(false) }}
          className="inline-flex h-9 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20 disabled:opacity-50"
        >
          Add Exercise
        </button>
      </div>
    </main>
  );
}
