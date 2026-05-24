import { ExerciseDescriptionType } from "../exercises/page";
export default function ExerciseDescription({exerciseDescription,id}:ExerciseDescriptionType){
    return(
        <>
            <div className="p-10b">
                {
                    Object.entries(exerciseDescription).map((exercise,id)=>{
                        
                        return(
                            <p key={id}>{exercise}</p>
                        );
                    })
                }
            </div>
        </>
    );
}