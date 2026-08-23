const API_URL = "http://localhost:8080/workouts"
type SetObject = {
  reps : number,
  isWeighted : boolean,
  isTimed : boolean,
  weight : number,
  durationSeconds : number
}
export type RoutineExercise = {
  id: string;
  name: string;
  mainMuscle: string;
  equipment: string;
  sets: SetObject[]
};

export type Routine = {
  id: string;
  name: string;
  createdAt: string;
  exercises: RoutineExercise[];
};

export async function loadRoutines(): Promise<Routine[]> {

  try {
    const response = await fetch(API_URL) ;
    if (!response.ok) throw new Error("Failed to fetch routines!!");
    return await response.json();
  } catch (error){
    console.log("Error while loading routines:",error);
    return [];
  }
}

export async function saveRoutine(routine: Omit<Routine, "id" | "createdAt">): Promise<Routine|null> {
  const payload = {
    name: routine.name.trim(),
    exercises: routine.exercises,
  };
  try{
    const response = await fetch(API_URL,{
      method : "POST",
      headers: {"Content-Type":"application/json"},
      body : JSON.stringify(payload)
    })
    if(!response.ok) throw new Error("Failed to save new routine");
    return await response.json();
  }catch(error) {
    console.error("Error saving routine:", error);
    return null;
  }
}

export async function deleteRoutine(id: string): Promise<boolean> {
  let isSuccess: boolean = false;
  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // Spring Boot @RequestBody String expects the raw string payload
      body: JSON.stringify(id), 
    });

    isSuccess= await response.json();

    if (isSuccess) {
      console.log('Workout deleted successfully');
    } else {
      console.error('Delete operation returned false');
    }
    return isSuccess;
  } catch (error) {
    console.error('Failed to delete workout:', error);
  }
  return isSuccess;
}
