"use client"

import React from 'react'
import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Label } from "recharts"
import { AreaChart,Area,CartesianGrid,XAxis,YAxis } from "recharts";

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
    title: "Monthly Progress",
    description: "Showing total workout time for the last 6 months",
    data: [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ]
  },
  {
    id: 2,
    title: "Weekly Progress",
    description: "Showing total workout time for the last 7 days",
    data: [
      { day: "Sunday", desktop: 186, mobile: 80 },
      { day: "Monday", desktop: 305, mobile: 200 },
      { day: "Tuesday", desktop: 237, mobile: 120 },
      { day: "Wednesday", desktop: 73, mobile: 190 },
      { day: "Thursday", desktop: 209, mobile: 130 },
      { day: "Friday", desktop: 214, mobile: 140 },
      { day: "Saturday", desktop: 214, mobile: 140 },
    ]
  },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
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
  back:{
    label:"back",
    color:"hsl(var(--chart-6))",
  },
  cardio:{
    lable:"cardio",
    color:"hsl(var(--chart-7))"
  }
}

const piChart = {
  title: "Taget body part",
  description: "Showing the number of body parts covered during the workout",
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
    return piChart.data.reduce((acc, curr) => acc + curr.exerciseDone, 0)
  }, [])
  return(<>
    <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-xl">Exercises Done</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
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
                data={piChart.data}
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
            <CardTitle className="text-xl">{chart.title}</CardTitle>
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
                  dataKey={chart.data[0].day ? "day" : "month"}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={6}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={3}
                  tickFormatter={(value) => `${value}(min)`}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-mobile)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-mobile)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="url(#fillMobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
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

export {ChartComponent,PieComponent}