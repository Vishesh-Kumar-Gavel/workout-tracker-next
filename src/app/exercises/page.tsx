import ExerciseDescription from "../components/ExerciseDescription";
export interface ExerciseDescriptionType {
  id : string,
  [propname : string] : string
}
async function getExercises() {
    const res = await fetch(`${process.env.SPRING_API_URL}all/exercise/description`, {
      cache: 'no-store', // Ensures fresh data on every request
    });
  
    const result = await res.json();
    console.log(result[0]);
    return result;
  }
export default async function exercises(){
    const data = await getExercises();
    return (
        <>
            {
              data.map((exercise:any)=>{
                let temp = 0;
                return(
                  <ExerciseDescription 
                    key={exercise.id+temp++} 
                    id={exercise.id+temp++} 
                    exerciseDescription={exercise}
                  />
                );
              })
            }
        </>
    );
}