"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { deleteRoutine, loadRoutines, Routine } from "../lib/routines";

export default function WorkoutsPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isMounted , setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    async function fetchRoutines() {
      const data = await loadRoutines();
      console.log(data);
      setRoutines(data);
    }

    fetchRoutines();
    // console.log(routines);
    setIsMounted(true);
  }, []);

  const handleDelete = async (id: string) => {
    await deleteRoutine(id);
    loadRoutines().then((data)=>{
      setRoutines(data);
    });
  };

  return (
    <main className="flex flex-1 flex-col px-4 py-4 md:px-8 md:py-6">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-neutral-50 md:text-xl">
            Workouts
          </h1>
          <p className="text-xs text-neutral-500 md:text-sm">
            Your saved routines
          </p>
        </div>

        <Link
          href="/create-routine"
          className="inline-flex h-9 items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"
        >
          <Image
            src="/notepad-text-white.svg"
            alt=""
            height={16}
            width={16}
          />
          New Routine
        </Link>
      </header>

      {isMounted===false || routines.length === 0 ? (
        <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 px-6 py-16 text-center">
          <p className="text-sm text-neutral-400">No routines yet</p>
          <p className="mt-1 max-w-sm text-xs text-neutral-500">
            Create a routine with exercises, sets, and reps to reuse in future
            workouts.
          </p>
          <Link
            href="/create-routine"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-2 text-xs font-medium text-neutral-200 transition hover:border-emerald-500/40 hover:text-emerald-200"
          >
            <Image
              src="/notepad-text-white.svg"
              alt=""
              height={16}
              width={16}
            />
            Create your first routine
          </Link>
        </section>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {routines.map((routine) => (
            <li
              key={routine.id}
              className="flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5"
            >
              
              <h2 className="truncate text-sm font-semibold text-neutral-50">
                {routine.name}
              </h2>
              <button onClick={()=>handleDelete(routine.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
