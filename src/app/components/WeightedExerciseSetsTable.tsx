`use client`
import { DraftExercise } from "../create-routine/page"
import Link from "next/link";
import { FormEvent, use, useEffect } from "react";
type WeightedExerciseSetsTableProps = {
    exercise: DraftExercise,
    draftExercises: DraftExercise[],
    setDraftExercises: React.Dispatch<React.SetStateAction<DraftExercise[]>>,
}
export default function WeightedExerciseSetsTable({ exercise, draftExercises, setDraftExercises }: WeightedExerciseSetsTableProps) {
    useEffect(() => {
        console.log("Updated Draft Exercises: ", draftExercises);
      }, [draftExercises]);
    function handleWeight(targetExercise: DraftExercise,sWeight:number,index:number){
        setDraftExercises(
            (prevDraftExercises) => prevDraftExercises.map(
                (exercise) => (exercise.id === targetExercise.id ?
                    { ...exercise, sets: exercise.sets.map((s,i)=>(i===index?{...s,weight:sWeight}:s)) }
                    : exercise)
            )
        )
        console.log("Weight Update: ",sWeight)
    }
    function addSet(targetExercise: DraftExercise) {

        const newSet = {
            isWeighted: false,
            isTimed: false,
            weight: 0,
            durationSeconds: 0,
            reps:12
        }
        setDraftExercises(
            (prevDraftExercises) => prevDraftExercises.map(
                (exercise) => (exercise.id === targetExercise.id ?
                    { ...exercise, sets: [...exercise.sets, newSet], }
                    : exercise)
            )
        )
    }
    const exerciseId = String(exercise.id);
    sessionStorage.setItem("draftExercises", draftExercises.toString());
    return <div className="relative flex flex-col justify-center w-full h-full rounded-xl bg-clip-border">
        <table className="w-full table-fixed">
            <thead >
                <tr >
                    <th className="text-left">Set</th>
                    <th className="text-left">KG</th>
                    <th className="text-left">Reps</th>
                </tr>
            </thead>
            <tbody>
                {
                    exercise.sets.map((s, index) => (
                        <tr key={exercise.id + "-" + index} className="">

                            <td className="text-left truncate">
                                {index + 1}
                            </td>
                            {/* Set Weights */}
                            <td className="text-left">
                                <input type="number" step={2.5} placeholder="0" className="text-left w-20" 
                                onChange={(e)=>{handleWeight(exercise,Number(e.target.value),index)}}/>
                            </td>

                            {/* Set Reps */}
                            <td className="text-left">
                                <input type="number" placeholder="12" className="text-left w-20" onChange={(e)=>{console.log(e)}}/>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        {/* Add Set */}
        <button className="inline-flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 px-3 text-xs font-medium text-neutral-300 transition hover:border-neutral-700 hover:text-neutral-100"
            onClick={() => addSet(exercise)}>
            add set
        </button>

    </div>
}