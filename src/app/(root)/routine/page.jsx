"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import GetTimeComponent from "@/components/GetTimeComponent";
import { toast } from '@/hooks/use-toast';
import { Select } from '@/components/ui/select';

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function RoutinePage() {
  const [routines, setRoutines] = useState([]);
  const [routineName, setRoutineName] = useState("");
  const [day, setDay] = useState("");
  const [muscle, setMuscle] = useState("");
  const [exercise, setExercise] = useState("");
  const [exerciseTime, setExerciseTime] = useState(0);
  const [choice,setChoice] = useState('');
  const isRunning = false;
  const [next, setNext] = useState(0);

  const routineData = routines[next];

  const muscleArray = [
    { bodyPart: "Chest" },
    { bodyPart: "Shoulders" },
    { bodyPart: "Legs" },
    { bodyPart: "Abs" },
    { bodyPart: "Arms" },
    { bodyPart: "Back" },
    { bodyPart: "Cardio" },
  ]

  const handleNext = () => {
    if (next === routines.length - 1) return;
    setNext(prev => prev + 1);
  }

  const handlePrev = () => {
    if (next > 0) {
      setNext(prev => prev - 1);
    }
  }

  useEffect(() => {
    fetchRoutines();
  }, [routineData]);


  const fetchRoutines = async () => {
    try {
      console.log("Fetching from /api/routines...");
      const res = await fetch("/api/routines", { method: "GET", cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${data.message || "Unknown error"}`);
      setRoutines(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleCreateRoutine = async () => {
    if (!routineName) return;
    try {
      const res = await fetch("/api/routines/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: routineName }),
      });
      const data = await res.json();
      toast({
        title: "Routine Created",
        description: "Your routine has been created successfully.",
        variant: "success",
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status} ${data.message || "Unknown error"}`);
      setRoutineName("");
      setNext(routines.length);
      fetchRoutines();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create routine. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddDetails = async (routineId) => {
    if (!day || !muscle || !exercise || !exerciseTime) return;
    try {
      const res = await fetch("/api/routines/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: routineId,
          detail: {
            day,
            muscle,
            exercises: [{ exerciseName: exercise, exerciseTime: exerciseTime }],
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(`Update failed: ${res.status} ${data.message}`);
      }
      toast({
        title: "Routine Updated",
        description: "Routine updated successfully",
        variant: "default", // Use "destructive" for errors
      });
      setDay("");
      setMuscle("");
      setExercise("");
      setExerciseTime(0);
      setNext(next);
      fetchRoutines();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update routine. Please try again.",
        variant: "destructive", // Use "destructive" for errors
      });
    }
  };

  const handleAnalysis = async () => {
      try{
        const res = await fetch("/api/progress-data/exercise-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ choice: choice }),
        });
        if(!res.ok){
          const data = await res.json();
          throw new Error(`Analysis failed: ${res.status} ${data.message}`);
        }

      }catch(error){
        console.error({message:"Error fetching data",error})
      }
    }


  // Rest of your code...
  const handleDeleteRoutine = async (routineId) => {
    try {
      const res = await fetch("/api/routines/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: routineId }),
      });
      if (res.ok) {
        toast({
          title: "Routine Deleted",
          description: "Your routine has been deleted successfully.",
          variant: "default",
        });
        fetchRoutines();
        setNext(0);
      }
      else console.error("Delete failed:", await res.text());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete routine. Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="lg:flex flex-col items-center justify-center w-full h-full">
      <div className="p-4 lg:w-[52rem]">
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">Routine
            <svg height={13} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1418 125"><path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z" fill="#4EFF02"></path></svg>
          </h1>
        </div>
        <div className="flex">
          <div className="text-neutral-200 flex flex-col w-full" >
            <p className="text-xs">This helps us to analyze your data! 👉👈</p>
            <div className="flex mt-2 items-center gap-2">
              <form onSubmit={handleAnalysis}>
              <Select onValueChange={(field) => setChoice(field.value)} defaultValue={'Select'} value={choice}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {muscleArray.map((data) => (
                    <SelectItem key={data.bodyPart} value={data.bodyPart}>{data.bodyPart}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" size="sm" className="border-2 border-white">Submit</Button>
              </form>
            <div className="flex justify-end w-full">
            <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">
                <Plus />
                Add Routine
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <Input
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  placeholder="Routine Name (e.g. Lower Body)"
                />
                <Button onClick={handleCreateRoutine} className="w-full">
                  Create
                </Button>
              </div>
            </PopoverContent>
          </Popover>
            </div>
            </div>
          
          </div>
        </div>

        <div className="mt-6 space-y-4 ">
          {routines.length > 0 && routineData?.name ?
            <>

              <Card key={routineData._id} className="border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <Button size="icon" variant="ghost" onClick={handlePrev}>
                    <ChevronLeft />
                  </Button>
                  <CardTitle className="text-3xl font-bold">{routineData.name}</CardTitle>

                  <Button size="icon" variant="ghost" onClick={handleNext}>
                    <ChevronRight />
                  </Button>

                </CardHeader>
                <div>
                  <CardContent key={routineData._id} className="mb-2">
                    <div className="flex items-center justify-between">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="text-white" variant="default">
                            <Plus />Add Details
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-2">
                            <Input value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" />
                            <Input value={muscle} onChange={(e) => setMuscle(e.target.value)} placeholder="Target Muscle (e.g.Hamstrings)" />
                            <Input value={exercise} onChange={(e) => setExercise(e.target.value)} placeholder="Exercise Name (e.g.Bench Press)" />
                            <Input value={exerciseTime} onChange={(e) => setExerciseTime(e.target.value)} placeholder="Exercise Time (.in mins)" />
                            <Button onClick={() => handleAddDetails(routineData._id)} className="w-full">
                              Add
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="ghost"
                        className="text-red-500 border"
                        onClick={() => handleDeleteRoutine(routineData._id)}
                      >
                        🗑️
                      </Button>
                    </div>
                    {routineData.details.map((detail, idx) => (
                      <ul key={detail._id} className="mt-4 space-y-2 bg-white">
                        <span className="text-xl font-bold">
                          📅 {detail.day}
                        </span>
                        <li key={idx} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                          <div className="flex flex-col items-start justify-start text-neutral-800">
                            <span className="font-semibold">
                              🎯Muscle: <span className="font-medium">{detail.muscle}</span>
                            </span>
                            <span className="font-semibold">
                              🏋️‍♂️Exercise:
                              <span className="font-medium"> {detail.exercises.map((ex) => ex.exerciseName).join(", ")}</span>
                            </span>
                            <span className="font-semibold">
                              ⌛Time:
                              <span className="font-medium"> {detail.exercises.map((data) => data.exerciseTime)}{' min'}</span>
                            </span>
                          </div>
                          <GetTimeComponent key={detail.idx} initialTimer={detail.exercises.map((data) => data.exerciseTime * 60)} running={isRunning} />
                        </li>
                      </ul>
                    ))}
                  </CardContent>
                </div>
              </Card>
            </>
            : <div className="bg-white rounded-xl h-52 w-full flex items-center justify-center">
              <h1 className="font-bold">Loading...</h1>
            </div>
          }
        </div>
      </div>
    </div>
  );
}