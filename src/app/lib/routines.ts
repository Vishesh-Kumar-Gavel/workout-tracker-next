export type RoutineExercise = {
  exerciseId: string;
  name: string;
  mainMuscle: string;
  equipment: string;
  sets: number;
  reps: number;
};

export type Routine = {
  id: string;
  name: string;
  createdAt: string;
  exercises: RoutineExercise[];
};

const STORAGE_KEY = "workout-tracker:routines";

export function loadRoutines(): Routine[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Routine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRoutine(routine: Omit<Routine, "id" | "createdAt">): Routine {
  const next: Routine = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: routine.name.trim(),
    exercises: routine.exercises,
  };

  const routines = loadRoutines();
  routines.unshift(next);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
  return next;
}

export function deleteRoutine(id: string): void {
  const routines = loadRoutines().filter((routine) => routine.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
}
