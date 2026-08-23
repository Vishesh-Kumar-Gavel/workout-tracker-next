"use client"
import CreateRoutineForm from "../components/CreateRoutineForm";
import CreateRoutineDetailsForm from "../components/CreateRoutineDetailsForm";

import { ExerciseDescriptionType } from "../exercises/page";
import { useEffect, useState } from "react";
import { RoutineExercise, } from "../lib/routines"
export type DraftExercise = RoutineExercise & { key: string };

export const DRAFT_EXERCISES_KEY = "Draft_Exercises";
export const ADD_DETAILS_KEY = "Add_Details";
export const ROUTINE_NAME_KEY = "Routine_Name";
export default function CreateRoutinePage() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [name, setName] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    try {
      const saved = sessionStorage.getItem(ROUTINE_NAME_KEY);
      return saved ? JSON.parse(saved) : "";
    } catch (e) {
      console.error(`Failed to parse ${ROUTINE_NAME_KEY} from session storage`, e);
      return "";
    }
  })
  const [exercises, setExercises] = useState<ExerciseDescriptionType[]>([]);
  const [draftExercises, setDraftExercises] = useState<DraftExercise[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = sessionStorage.getItem(DRAFT_EXERCISES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(`Failed to parse ${DRAFT_EXERCISES_KEY} from session storage`, e);
      return [];
    }
  });
  const [addDetails, setAddDetails] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const saved = sessionStorage.getItem(ADD_DETAILS_KEY);
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      console.error(`Failed to parse ${ADD_DETAILS_KEY} from session storage`, e);
      return false;
    }
  });

  useEffect(() => {
    async function getExercises() {
      const res = await fetch(
        `http://localhost:8080/all/exercise/description`,
        { cache: "no-store" }
      );
      const result = await res.json();
      console.log(result);
      setExercises(result);
    }
    setIsMounted(true);
    getExercises();
  }, []);
  useEffect(() => {
    sessionStorage.setItem(DRAFT_EXERCISES_KEY, JSON.stringify(draftExercises));
  }, [draftExercises]);
  useEffect(() => { sessionStorage.setItem(ADD_DETAILS_KEY, JSON.stringify(addDetails)) }, [addDetails]);
  useEffect(() => { sessionStorage.setItem(ROUTINE_NAME_KEY, JSON.stringify(name)) }, [name]);
  if (isMounted === false) return null;
  return (
    (addDetails ?
      <CreateRoutineDetailsForm draftExercises={draftExercises} setDraftExercises={setDraftExercises} name={name} setName={setName} setAddDetails={setAddDetails} />
      :
      <CreateRoutineForm exercises={exercises} draftExercises={draftExercises}
        setDraftExercises={setDraftExercises} setAddDetails={setAddDetails} name={name} setName={setName} />)
  );
}
