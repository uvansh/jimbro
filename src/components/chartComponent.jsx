"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Label } from "recharts"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartCategory = [
  {
    id: 1,
    title: "Exercise Analytics",
    measurement: 'min',
    emoji: "🏋️‍♂️",
    description: "Showing total workout time for the last 7 days",
    data: [
      { day: "Sunday", workoutTime: 0 },
      { day: "Monday", workoutTime: 200 },
      { day: "Tuesday", workoutTime: 120 },
      { day: "Wednesday", workoutTime: 0 },
      { day: "Thursday", workoutTime: 130 },
      { day: "Friday", workoutTime: 140 },
      { day: "Saturday", workoutTime: 140 },
    ]
  },
  {
    id: 2,
    title: "Calorie Analysis",
    measurement: 'cal.',
    emoji: "🥗",
    description: "Showing total workout time for the last 7 days",
    data: [
      { day: "Sunday", caloriesIntake: 2000 },
      { day: "Monday", caloriesIntake: 1500 },
      { day: "Tuesday", caloriesIntake: 2500 },
      { day: "Wednesday", caloriesIntake: 900 },
      { day: "Thursday", caloriesIntake: 2350 },
      { day: "Friday", caloriesIntake: 2100 },
      { day: "Saturday", caloriesIntake: 800 },
    ]
  }
]

const chartConfig = {
  workoutTime: {
    label: "Workout Time",
    color: "hsl(var(--chart-1))",
  },
  caloriesIntake: {
    label: "Calories Intake",
    color: "hsl(var(--chart-2))",
  },
  exerciseDone: {
    label: "exerciseDone",
  },
  chest: {
    label: "chest",
    color: "hsl(var(--chart-1))",
  },
  shoulders: {
    label: "shoulders",
    color: "hsl(var(--chart-2))",
  },
  legs: {
    label: "legs",
    color: "hsl(var(--chart-3))",
  },
  abs: {
    label: "abs",
    color: "hsl(var(--chart-4))",
  },
  arm: {
    label: "arm",
    color: "hsl(var(--chart-5))",
  },
  back: {
    label: "back",
    color: "hsl(var(--chart-6))",
  },
  cardio: {
    lable: "cardio",
    color: "hsl(var(--chart-7))"
  }
}


export const PieComponent = () => {
  const [piExercise, setPiExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalExercises, setTotalExercises] = useState(0);

  // Define custom colors for each body part
  const COLORS = {
    Chest: "#FF8042",
    Shoulders: "#0088FE",
    Legs: "#00C49F",
    Abs: "#FFBB28",
    Arms: "#FF0000",
    Back: "#8884d8",
    Cardio: "#82ca9d"
  };

  // Generate chart data based on the fetched exercise data
  const generateChartData = useCallback((data) => {
    if (!data) return [];
    
    // Ensure we have numeric values for all categories
    const chartData = [
      { bodyPart: "Chest", exerciseDone: Number(data.Chest || 0), fill: COLORS.Chest },
      { bodyPart: "Shoulders", exerciseDone: Number(data.Shoulders || 0), fill: COLORS.Shoulders },
      { bodyPart: "Legs", exerciseDone: Number(data.Legs || 0), fill: COLORS.Legs },
      { bodyPart: "Abs", exerciseDone: Number(data.Abs || 0), fill: COLORS.Abs },
      { bodyPart: "Arms", exerciseDone: Number(data.Arms || 0), fill: COLORS.Arms },
      { bodyPart: "Back", exerciseDone: Number(data.Back || 0), fill: COLORS.Back },
      { bodyPart: "Cardio", exerciseDone: Number(data.Cardio || 0), fill: COLORS.Cardio },
    ];
    
    // Filter out zero values
    const filteredData = chartData.filter(item => item.exerciseDone > 0);
    
    // Calculate total exercises
    const total = filteredData.reduce((sum, item) => sum + item.exerciseDone, 0);
    setTotalExercises(total);
    
    return filteredData;
  }, []);
  
  const getPiExercise = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/progress-data/exercise-data", {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch exercise data: ${res.status}`);
      }
      
      const data = await res.json();
      setPiExercise(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching exercise data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    getPiExercise();
    
    // Remove the interval to prevent constant re-fetching
    // const intervalId = setInterval(() => {
    //   getPiExercise();
    // }, 60000); // Refresh every minute
    
    // return () => clearInterval(intervalId);
  }, [getPiExercise]);

  // Memoize chart data to prevent unnecessary recalculations
  const chartData = useMemo(() => generateChartData(piExercise), [generateChartData, piExercise]);
  const hasData = useMemo(() => chartData.some(item => item.exerciseDone > 0), [chartData]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded shadow-md border border-gray-200">
          <p className="font-bold">{data.bodyPart}</p>
          <p className="text-sm">{data.exerciseDone} exercises</p>
        </div>
      );
    }
    return null;
  };

  // Custom label for pie chart segments
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${payload.exerciseDone}`}
      </text>
    );
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl">Exercises Done 📊</CardTitle>
        <CardDescription>Body Part Distribution</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <div className='flex justify-center items-center h-[250px]'>
            <p>Loading exercise data...</p>
          </div>
        ) : error ? (
          <div className='flex justify-center items-center h-[250px] text-red-500'>
            <p>Error: {error}</p>
          </div>
        ) : !hasData ? (
          <div className='flex justify-center flex-col items-center h-[250px] p-5 text-lg'>
            <p className='text-3xl'>🥺</p>
            <p className="text-md">No exercise data yet!</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add exercises to your routines to see them here.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="exerciseDone"
                nameKey="bodyPart"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              <ChartTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
      
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Total exercises: {totalExercises}
        </div>
      </CardFooter>
    </Card>
  );
};

export const ChartComponent = () => {
  return (
    <>
      {chartCategory.map((chart) =>
        <Card key={chart.id}>
          <CardHeader>
            <CardTitle className="text-xl">{chart.title} {chart.emoji}</CardTitle>
            <CardDescription>
              {chart.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chart.data}
                margin={{
                  right: 12,
                  top: 14,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={"day"}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value} ${chart.measurement}`}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillworkoutTime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-workoutTime)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-workoutTime)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillcaloriesIntake" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-caloriesIntake)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-caloriesIntake)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="caloriesIntake"
                  type="natural"
                  fill="url(#fillcaloriesIntake)"
                  fillOpacity={0.4}
                  stroke="var(--color-caloriesIntake)"
                  stackId="a"
                />
                <Area
                  dataKey="workoutTime"
                  type="natural"
                  fill="url(#fillworkoutTime)"
                  fillOpacity={0.4}
                  stroke="var(--color-workoutTime)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </>)
}