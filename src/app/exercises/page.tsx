import ExerciseList from "../components/ExerciseList";

export interface ExerciseDescriptionType {
  id: string;
  name: string;
  mainMuscle: string;
  difficulty: string;
  equipment: string;
  mechanics: string;
  force: string;
  utility: string;
  preparation: string;
  execution: string;
  targetMuscle: string;
  synergistMuscle: string;
  stabilizerMuscle: string;
  [propname: string]: string;
}

async function getExercises(): Promise<ExerciseDescriptionType[]> {
  const res = await fetch(`${process.env.SPRING_API_URL}all/exercise/description`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function ExercisesPage() {
  const data = await getExercises();

  return <ExerciseList exercises={data} />;
}
