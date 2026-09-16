'use client'
import { useSearchParams } from "next/navigation"
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadRoutine, Routine , RoutineExercise} from "../lib/routines";
import WeightedExerciseSetsTable from "../components/WeightedExerciseSetsTable";
import { DraftExercise} from "../create-routine/page";
import { buttonVariants } from "../components/Button";
export default function LogWorkout() {
    const searchParams = useSearchParams();
    const routineId = searchParams.get('routineId');
    
    const [routine,setRoutine] = useState<Routine>();
    const [exercies,setExercises] = useState<DraftExercise[]>([]);
    useEffect(() => {
        async function getRoutine(routineId: string) {
            console.log("Fetching Routine with routine id :"+routineId);
            const data = await loadRoutine(routineId);
            setRoutine(data);
            setExercises(data.exercises as DraftExercise[])
        }
        if (routineId !== null) {
            const res = getRoutine(routineId);
        }
    }, [routineId])

    return <div className="flex flex-col w-full">
      <header className="m-2 flex items-center justify-between px-2">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-neutral-50 md:text-xl">
            {routine?.name} Routine
          </h1>
          <p className="text-xs text-neutral-500 md:text-sm">
            log workout
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/workouts"
            className={buttonVariants({intent:"cancel",size:"medium"})}
          >
            Discard
          </Link>
          <Link
            type="submit"
            href = "/workouts"
            className={buttonVariants({intent:"primary",size:"medium"})}
          >
            Finish
          </Link>
        </div>
      </header>
      <div className="px-4">
        {
          <ul className="divide-y divide-neutral-800 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-950/40">
            {routine === undefined ? (
              <li className="px-4 py-8 text-center text-sm text-neutral-500">
                No exercises found.
              </li>
            ) : (
              routine.exercises.map((exercise) => {
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
                      <WeightedExerciseSetsTable exercise={exercise as DraftExercise} draftExercises={routine.exercises as DraftExercise[]} setDraftExercises={setExercises}/>

                    </div>
                  </li>
                );
              })
            )}
          </ul> 
        }  
      </div>
    </div>
}