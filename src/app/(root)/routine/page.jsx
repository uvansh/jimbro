"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";
import GetTimeComponent from "@/components/GetTimeComponent";


export default function RoutinePage() {
  const [routines, setRoutines] = useState([]);
  const [routineName, setRoutineName] = useState("");
  const [day, setDay] = useState("");
  const [muscle, setMuscle] = useState("");
  const [exercise, setExercise] = useState("");
  const [exerciseTime, setExerciseTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [next,setNext] = useState(0);

  useEffect(() => {
    fetchRoutines();
  }, []);

  const handleNext = () => {
    setNext(prev=>prev+1)
  }

  const handleStart = () => {
    setIsRunning(prev => !prev);
  }

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
      console.log("POSTing to /api/routines/create with:", { name: routineName });
      const res = await fetch("/api/routines/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: routineName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(`Create failed: ${res.status} ${data.message || "Unknown error"}`);
      setRoutineName("");
      fetchRoutines();
    } catch (error) {
      console.error("Create error:", error);
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
      const data = await res.json();
      console.log("Update successful:", data);
      setDay("");
      setMuscle("");
      setExercise("");
      setExerciseTime(0);
      fetchRoutines();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // Rest of your code...
  const handleDeleteRoutine = async (routineId) => {
    const res = await fetch("/api/routines/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: routineId }),
    });
    if (res.ok) fetchRoutines();
    else console.error("Delete failed:", await res.text());
  };


  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-white mb-4">Routine
      <svg height={13} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1418 125"><path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z" fill="#4EFF02"></path></svg>
      </h1>
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
              placeholder="Routine Name"
            />
            <Button onClick={handleCreateRoutine} className="w-full">
              Create
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <div className="mt-6 space-y-4">
        {routines.length>0?
        <>
        {routines.map((routine) => (
          <Card key={routine._id} className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-3xl font-bold">{routine.name}</CardTitle>
              <Button
                variant="ghost"
                className="text-red-500 border"
                onClick={() => handleDeleteRoutine(routine._id)}
              >
                🗑️
              </Button>
              <Button size="icon" variant="ghost" onClick={handleNext[routine._id]}>
                <ChevronRight />
              </Button>
            </CardHeader>
            <CardContent className="mb-2">
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
                    <Button onClick={() => handleAddDetails(routine._id)} className="w-full">
                      Add
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              {routine.details.map((detail, idx) => (
                <ul className="mt-4 space-y-2 bg-white">
                  <span className="text-xl font-bold">
                  📅{detail.day}
                  </span>
                  <li key={idx} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                    <span className="flex flex-col items-start justify-start text-neutral-800">
                      🎯{detail.muscle}
                      <span>
                        🏋️‍♂️{detail.exercises.map((ex) => ex.exerciseName).join(", ")}
                      </span>
                      ⌛{detail.exercises.map((data) => data.exerciseTime)}{' min'}
                    </span>
                    <GetTimeComponent key={detail.idx} initialTimer={detail.exercises.map((data) => data.exerciseTime * 60)} running={isRunning} />
                    <Button key={detail._id} onClick={handleStart}>{isRunning ? 'Stop' : 'Start'}</Button>
                  </li>
                </ul>
              ))}
            </CardContent>
          </Card>
        ))}
        </>
        :<div>
          <h1>Nothing to show</h1>
          </div>
          }
      </div>
    </div>
  );
}