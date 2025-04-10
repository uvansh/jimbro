'use client'

import { Calendar, Home, ChefHat, ChartLine, ClipboardList, Settings, BicepsFlexed, LogOutIcon, CalendarCheck, RefreshCw } from "lucide-react"
import Link from 'next/link'
import { Progress } from '@/components/ui/progress';
import { useState, useEffect, useCallback } from "react";
import { Plus } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useIsMobile } from "@/hooks/use-mobile"
import { SignOutButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';

// Menu items.

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Routine",
    url: "/routine",
    icon: ClipboardList,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Meal Preparation",
    url: "/meal-prep",
    icon: ChefHat,
  },
  {
    title: "Progress",
    url: "/progress",
    icon: ChartLine,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]


export function AppSidebar(props) {
  const [targetCalories, setTargetCalories] = useState(''); // Actual calories intake
  const [targetExercise, setTargetExercise] = useState(''); // Actual exercise time
  const [calories, setCalories] = useState(''); // Actual calories intake
  const [exercise, setExercise] = useState(''); // Actual exercise time
  const [latestDailyData, setLatestDailyData] = useState(null);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Memoize the fetchProgress function to prevent unnecessary re-renders
  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch('/api/progress-data', { 
        method: 'GET', 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: Failed to fetch progress`);
      }
      
      const data = await res.json();
      
      if (data && data.length > 0) {
        // Always use the first item (most recent) as the latest data
        setLatestDailyData(data[0]);
      } else {
        setLatestDailyData(null);
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
    } finally {
      setIsDataUpdated(false);
      setIsResetting(false);
      setInitialLoadComplete(true);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress, isDataUpdated]);
  
  // Handle adding activity (calories and exercise)
  const handleTargetActivity = async () => {
    try {
      const res = await fetch('/api/progress-data/activity/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          targetCaloriesIntake: Number(targetCalories) || 0,
          targetExerciseTime: Number(targetExercise) || 0,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error ${res.status}: ${errorData.message}`);
      }
      
      toast({
        title: "Target Set",
        description: "Your daily targets have been set successfully.",
        variant: "default",
      });
      
      setTargetCalories(''); // Reset inputs
      setTargetExercise('');
      setIsDataUpdated(true); // Trigger data refresh
    } catch (error) {
      console.error('Failed to set targets:', error);
      toast({
        title: "Error",
        description: "Failed to set targets. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle adding activity (calories and exercise)
  const handleActivityChange = async () => {
    try {
      const res = await fetch('/api/progress-data/activity/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          caloriesIntake: Number(calories) || 0,
          exerciseTime: Number(exercise) || 0,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error ${res.status}: ${errorData.message}`);
      }
      
      
      setCalories('');
      setExercise('');
      setIsDataUpdated(true); // Trigger data refresh
      
      toast({
        title: "Activity Updated",
        description: "Your daily activity has been successfully updated.",
        variant: "default",
      });
    } catch (error) {
      console.error('Failed to update activity:', error);
      toast({
        title: "Error",
        description: "Failed to update activity. Please try again.",
        variant: "destructive",
      });
    }
  };


  async function getDeviceInfo() {
    await useIsMobile();
  }

  return (
    <>
      <Sidebar side="left" collapsible={getDeviceInfo ? "" : "none"} className="h-screen border border-neutral-800">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl font-bold mb-10 mt-5"><span className="p-1"><BicepsFlexed /></span>jimBro</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} prefetch>
                        <item.icon />
                        <span className="text-lg font-normal">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <SidebarMenu>
                <div className="w-44 mx-auto flex flex-col gap-2">
                  <div className='flex mt-14 items-center gap-2 '>
                    <CalendarCheck size={18} />
                    <div className="font-normal text-sm flex">
                      <div className="flex items-center justify-center">
                        Daily Target
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button size="icon" disabled={
                              (latestDailyData?.targetCalories !== 0 || latestDailyData?.targetExerciseTime !== 0) && // Check if targets are set
                              latestDailyData?.targetCalories - latestDailyData?.caloriesIntake <= 0 &&
                              latestDailyData?.targetExerciseTime - latestDailyData?.exerciseTime <= 0
                            } className="hover:text-neutral-300 flex justify-end">
                              <Plus />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            {/* Conditional Rendering */}
                            {latestDailyData &&
                              latestDailyData.targetCalories === 0 &&
                              latestDailyData.targetExerciseTime === 0 ? (
                              // Render target-setting popover
                              <div>
                                <Input
                                  placeholder="Target Calories"
                                  value={targetCalories}
                                  onChange={(e) => setTargetCalories(e.target.value)}
                                  type="number"
                                />
                                <Input
                                  placeholder="Target Exercise (minutes)"
                                  value={targetExercise}
                                  onChange={(e) => setTargetExercise(e.target.value)}
                                  type="number"
                                />
                                <Button onClick={handleTargetActivity} className="mt-2">
                                  Set Target
                                </Button>
                              </div>
                            ) : (
                              // Render activity-updating popover
                              <div>
                                <Input
                                  placeholder="Calories taken"
                                  value={calories}
                                  onChange={(e) => setCalories(e.target.value)}
                                  type="number"
                                />
                                <Input
                                  placeholder="Exercise done (minutes)"
                                  value={exercise}
                                  onChange={(e) => setExercise(e.target.value)}
                                  type="number"
                                />
                                <Button onClick={handleActivityChange} className="mt-2">
                                  Update Activity
                                </Button>
                              </div>
                            )}
                          </PopoverContent>
                        </Popover>
                        
                      </div>
                    </div>
                  </div>
                  {/* Progress Bars */}
                  {latestDailyData &&
                    latestDailyData.targetCalories !== 0 &&
                    latestDailyData.targetExerciseTime !== 0 && (
                      <div>
                        <div key={latestDailyData?._id}>
                          <Progress
                            className="bg-white h-5 mb-2 text-black text-sm w-full"
                            value={latestDailyData?.caloriesIntake}
                            totalvalue={latestDailyData?.targetCalories}
                            measure="cal"
                          />
                          <Progress
                            className="bg-white h-5 text-black text-sm w-full"
                            value={latestDailyData?.exerciseTime}
                            totalvalue={latestDailyData?.targetExerciseTime}
                            measure="min"
                          />
                        </div>
                        <p className="text-xs text-yellow-400 mt-2">
                          {latestDailyData.targetCalories - latestDailyData.caloriesIntake <= 0 &&
                            latestDailyData.targetExerciseTime - latestDailyData.exerciseTime <= 0 ?
                            "🎉Congratulations! You've reached your target!🎉"
                            : "💪Keep Going!!!"}</p>

                      </div>
                    )}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <hr className="border border-b-2 border-neutral-700 mb-2 flex items-center" />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-2 mb-2 ml-2">
                <img src={props.userImage} width={35} className="rounded-full" />
                <div className="flex flex-col">
                  <span>{props.userName}</span>
                  <span className="text-neutral-500 text-xs">{props.userEmail}</span>
                </div>
                <SignOutButton className="cursor-pointer w-6 mx-auto">
                  <LogOutIcon size={20} />
                </SignOutButton>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
