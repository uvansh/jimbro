"use client"

import React from 'react'
import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Label } from "recharts"
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

const piChart = {
  title: "Taget body part",
  description: "Showing the number of body parts covered during the workout",
  emoji: "📊",
  data: [
    { bodyPart: "Chest", exerciseDone: 75, fill: "var(--color-chest)" },
    { bodyPart: "Shoulders", exerciseDone: 48, fill: "var(--color-shoulders)" },
    { bodyPart: "Legs", exerciseDone: 87, fill: "var(--color-legs)" },
    { bodyPart: "Abs", exerciseDone: 73, fill: "var(--color-abs)" },
    { bodyPart: "Arms", exerciseDone: 39, fill: "var(--color-arm)" },
    { bodyPart: "Back", exerciseDone: 86, fill: "var(--color-back)" },
    { bodyPart: "Cardio", exerciseDone: 20, fill: "var(--color-cardio)" },
  ]
}

const PieComponent = () => {
  const totalVisitors = React.useMemo(() => {
    return piChart.data.reduce((acc, curr) => acc + curr.exerciseDone, 0);
  }, [])

  const [piExercise,setPiExercise] = React.useState([]);

  const getPiExercise = async () => {
    try {
      const res = await fetch("/api/progress-data/exercise-data");
      const data = await res.json();
      setPiExercise(data);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(`Analysis failed: ${res.status} ${data.message}`);
      }
    } catch (error) {
      console.error({ message: "Error fetching data", error });
    }
  }

  React.useEffect(()=>{
    getPiExercise();
  },[]);

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-xl">Exercises Done {piChart.emoji}</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
          {console.log(piExercise?.Arms)}
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={piExercise?.data}
                dataKey="exerciseDone"
                nameKey="bodyPart"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Exercises done
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>)
}

const ChartComponent = () => {
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

export { ChartComponent, PieComponent }