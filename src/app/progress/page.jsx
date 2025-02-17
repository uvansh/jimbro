"use client"
 
import {LineChart , Line ,CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartContainer } from "@/components/ui/chart"
import { Monitor, Smartphone } from "lucide-react"
 
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]
  const chartConfig = {
    desktop: {
      label: "Desktop",
      icon: Monitor,
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      icon: Smartphone,
      color: "#60a5fa",
    },
  }

const Progress = () =>{
      
    return(
        <div className="bg-black">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis/>
           <ChartTooltip content={<ChartTooltipContent />} />
          <Line dataKey="desktop" type="monotone" stroke="#8884d8" />
          <Line dataKey="mobile" type="monotone" stroke="#82ca9d"/>
        </LineChart>
      </ChartContainer>
       </div>
    )
}

export default Progress;