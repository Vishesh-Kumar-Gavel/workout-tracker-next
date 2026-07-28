import CreateRoutineForm from "../components/CreateRoutineForm";
import { ExerciseDescriptionType } from "../exercises/page";

async function getExercises(): Promise<ExerciseDescriptionType[]> {
  const res = await fetch(
    `${process.env.SPRING_API_URL}all/exercise/description`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function CreateRoutinePage() {
  const exercises = await getExercises();

  return <CreateRoutineForm exercises={exercises} />;
}
