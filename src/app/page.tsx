"use client";

import { FormEvent, useState } from "react";

type Workout = {
  id: number;
  dateLabel: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
};

export default function Home() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: 1,
      dateLabel: "Today",
      exercise: "Bench Press",
      sets: 4,
      reps: 8,
      weight: 185,
    },
    {
      id: 2,
      dateLabel: "Yesterday",
      exercise: "Back Squat",
      sets: 5,
      reps: 5,
      weight: 225,
    },
    {
      id: 3,
      dateLabel: "2 days ago",
      exercise: "Deadlift",
      sets: 3,
      reps: 5,
      weight: 275,
    },
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!exercise.trim() || !sets || !reps || !weight) {
      return;
    }

    const newWorkout: Workout = {
      id: Date.now(),
      dateLabel: "Just now",
      exercise: exercise.trim(),
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
    };

    setWorkouts((prev) => [newWorkout, ...prev]);

    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-neutral-800 bg-neutral-950/80 px-6 py-6 md:flex">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
            <span className="text-lg font-semibold">WT</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">
              Workout Tracker
            </div>
            <div className="text-xs text-neutral-500">
              Daily performance dashboard
            </div>
          </div>
        </div>

        <nav className="space-y-1 text-sm">
          <button className="flex w-full items-center gap-2 rounded-lg bg-neutral-900/80 px-3 py-2 text-left text-neutral-100 ring-1 ring-emerald-500/40">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400">
              ●
            </span>
            <span className="font-medium">Dashboard</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-neutral-400 transition hover:bg-neutral-900/60 hover:text-neutral-100">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-neutral-500">
              ▢
            </span>
            Workouts
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-neutral-400 transition hover:bg-neutral-900/60 hover:text-neutral-100">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-neutral-500">
              ▲
            </span>
            Analytics
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-neutral-400 transition hover:bg-neutral-900/60 hover:text-neutral-100">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-neutral-500">
              ⚙
            </span>
            Settings
          </button>
        </nav>

        <div className="mt-auto pt-8 text-xs text-neutral-500">
          <div className="mb-2 text-neutral-400">Today&apos;s focus</div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-3">
            <div className="mb-1 text-xs font-medium text-neutral-200">
              Upper Body Strength
            </div>
            <div className="text-[11px] text-neutral-500">
              Log bench, rows, and accessory work.
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col px-4 py-4 md:px-8 md:py-6">
        {/* Top bar for mobile + title */}
        <header className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-neutral-50 md:text-xl">
              Dashboard
            </h1>
            <p className="text-xs text-neutral-500 md:text-sm">
              Quick log your training and review your recent workouts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 md:inline-flex">
              ● On track this week
            </div>
            <button className="inline-flex h-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 px-3 text-xs font-medium text-neutral-300 transition hover:border-emerald-500/40 hover:bg-neutral-900 hover:text-emerald-200">
              Profile
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          {/* Quick Log form */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.8),0_18px_40px_rgba(0,0,0,0.85)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-neutral-50">
                  Quick Log
                </h2>
                <p className="text-xs text-neutral-500">
                  Add a set in seconds – no navigation required.
                </p>
              </div>
              <span className="inline-flex h-7 items-center rounded-full bg-emerald-500/10 px-2 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/40">
                + New entry
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-sm text-neutral-200"
            >
              <div className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="exercise"
                    className="text-xs font-medium text-neutral-400"
                  >
                    Exercise Name
                  </label>
                  <input
                    id="exercise"
                    type="text"
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                    placeholder="e.g. Bench Press"
                    className="h-9 rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 text-xs text-neutral-100 outline-none ring-emerald-500/40 placeholder:text-neutral-600 focus:border-emerald-500/60 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="sets"
                    className="text-xs font-medium text-neutral-400"
                  >
                    Sets
                  </label>
                  <input
                    id="sets"
                    type="number"
                    min={1}
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    placeholder="4"
                    className="h-9 rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 text-xs text-neutral-100 outline-none ring-emerald-500/40 placeholder:text-neutral-600 focus:border-emerald-500/60 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reps"
                    className="text-xs font-medium text-neutral-400"
                  >
                    Reps
                  </label>
                  <input
                    id="reps"
                    type="number"
                    min={1}
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="8"
                    className="h-9 rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 text-xs text-neutral-100 outline-none ring-emerald-500/40 placeholder:text-neutral-600 focus:border-emerald-500/60 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="weight"
                    className="text-xs font-medium text-neutral-400"
                  >
                    Weight (lbs)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    min={0}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="185"
                    className="h-9 rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 text-xs text-neutral-100 outline-none ring-emerald-500/40 placeholder:text-neutral-600 focus:border-emerald-500/60 focus:ring-2"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-3 border-t border-neutral-900 pt-3 text-xs text-neutral-500 md:flex-row md:items-center">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-[11px] text-emerald-300 ring-1 ring-emerald-500/40">
                    ✓
                  </span>
                  <span>
                    Your entry will immediately appear in{" "}
                    <span className="font-medium text-neutral-300">
                      Recent Workouts
                    </span>
                    .
                  </span>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600/90 text-[11px] text-emerald-50">
                    +
                  </span>
                  Log Workout
                </button>
              </div>
            </form>
          </div>

          {/* Recent Workouts */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-neutral-50">
                  Recent Workouts
                </h2>
                <p className="text-xs text-neutral-500">
                  A snapshot of your latest logged sets.
                </p>
              </div>
              <span className="text-[11px] font-medium text-neutral-500">
                {workouts.length} entries
              </span>
            </div>

            <div className="space-y-2">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-neutral-850/60 bg-neutral-950/40 px-3 py-3 text-xs text-neutral-200 ring-0 transition hover:border-emerald-500/30 hover:bg-neutral-900/80 hover:ring-1 hover:ring-emerald-500/30"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <div className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-500/40">
                      {workout.exercise.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-neutral-50">
                        {workout.exercise}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {workout.sets} sets × {workout.reps} reps @{" "}
                        {workout.weight} lbs
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-neutral-500">
                    <div>{workout.dateLabel}</div>
                    <div className="mt-0.5 text-[10px] text-emerald-300/80 opacity-0 transition group-hover:opacity-100">
                      Logged via Quick Log
                    </div>
                  </div>
                </div>
              ))}

              {workouts.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-950/30 px-4 py-10 text-center text-xs text-neutral-500">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-xl">
                    🏋️
                  </div>
                  <div className="mb-1 text-sm font-medium text-neutral-200">
                    No workouts logged yet
                  </div>
                  <p className="max-w-xs text-[11px] text-neutral-500">
                    Use the Quick Log form to add your first workout. New
                    entries will appear here instantly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
