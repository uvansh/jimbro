'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { ChartComponent, PieComponent } from "@/components/chartComponent"
import { Suspense } from 'react';

import HashLoader from 'react-spinners/HashLoader';
import { Progress } from '@/components/ui/progress';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from '@/hooks/use-toast';
import { RefreshCcw } from 'lucide-react';

export default function ProgressPage() {

  const [latestData, setLatestData] = useState(null);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  function Loading() {
    return (<HashLoader color="#fffff" size={32} />)
  }

  const fetchProgress = useCallback(async () => {
    try {
      // Use cache: 'no-store' to prevent caching
      const res = await fetch('/api/progress-data', { 
        method: 'GET', 
        cache: 'no-store',
        headers: {
          // Add a timestamp to force a fresh request
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
        // Always set the first item (most recent) as the latest data
        setLatestData(data[0]);
      } else if (data.length === 0) {
        setLatestData(null);
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
    } finally {
      // Mark initial load as complete
      setInitialLoadComplete(true);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress, isDataUpdated]); // This will re-run when isDataUpdated or fetchProgress changes

  const resetDailyTracker = useCallback(async () => {
    if (isResetting) return; // Prevent multiple clicks
    
    setIsResetting(true);
    try {
      const res = await fetch('/api/progress-data/activity/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to reset data');
      }
      
      const data = await res.json();
      
      // Only show toast for manual resets (not automatic ones)
      toast({
        title: "Reset Complete",
        description: "Your daily targets and progress have been reset.",
        variant: "default",
      });
      
      // Toggle isDataUpdated to trigger a re-fetch
      setIsDataUpdated(prev => !prev);
      
      // Force clear any cached data
      setLatestData(null);
    } catch (error) {
      console.error('Error resetting data:', error);
      toast({
        title: "Error",
        description: "Failed to reset data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  }, [isResetting]);

  // Silent reset function for automatic resets (no toast)
  const silentReset = useCallback(async () => {
    try {
      const res = await fetch('/api/progress-data/activity/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      if (!res.ok) {
        console.error('Silent reset failed');
        return;
      }
      
      // Quietly update the data without toast
      setIsDataUpdated(prev => !prev);
    } catch (error) {
      console.error('Error in silent reset:', error);
    }
  }, []);

  // This effect only runs once after the initial data load is complete
  // and only if needed (new day check)
  useEffect(() => {
    // Skip this effect during the initial render
    if (!initialLoadComplete || !latestData) return;
    
    const checkForNewDay = async () => {
      const now = new Date();
      const lastCreatedAt = latestData ? new Date(latestData.createdAt) : null;
  
      // Check if it's a new day (after midnight)
      if (lastCreatedAt && now.getDate() !== lastCreatedAt.getDate()) {
        // Silently reset without showing toast
        await silentReset();
      }
    };
    
    checkForNewDay();
  }, [initialLoadComplete, latestData, silentReset]); // Add silentReset to dependencies

  // Add a manual reset button for testing
  const handleManualReset = useCallback(() => {
    resetDailyTracker();
  }, [resetDailyTracker]);

  // Memoize the card content to prevent unnecessary re-renders
  const cardContent = useMemo(() => {
    if (!latestData?._id) return null;
    
    const showLastUpdated = latestData?.updatedAt && 
      (latestData.targetCalories > 0 || 
       latestData.targetExerciseTime > 0 || 
       latestData.caloriesIntake > 0 || 
       latestData.exerciseTime > 0);
    
    const lastUpdatedText = showLastUpdated 
      ? `Last updated at ${new Date(latestData.updatedAt).toLocaleTimeString()}`
      : "Not updated yet";
    
    const statusMessage = (latestData?.targetCalories !== 0 && latestData?.targetExerciseTime !== 0) &&
      (latestData?.targetCalories - latestData?.caloriesIntake <= 0 &&
        latestData?.targetExerciseTime - latestData?.exerciseTime <= 0)
      ? "🎉Congratulations you have finished your target!" 
      : (latestData?.targetCalories === 0 && latestData?.targetExerciseTime === 0) 
        ? "🎯Set up a target now!" 
        : "💪Keep Going!";
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between flex-row">
            <CardTitle className="text-2xl">Daily Activity Tracker 📃</CardTitle>
            <Button onClick={handleManualReset} size="icon" variant="ghost" className="flex">
              <RefreshCcw/>
            </Button>
          </div>
          <CardDescription>
            {lastUpdatedText}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className='font-semibold text-xl'>🥑Calories</h1>
          <Progress 
            className="h-10 w-full" 
            value={latestData?.caloriesIntake || 0} 
            totalvalue={latestData?.targetCalories || 0} 
            measure="cal" 
          />
          <h1 className='font-semibold text-xl mt-2'>🏋️‍♂️Exercise</h1>
          <Progress 
            className="h-10 w-full" 
            value={latestData?.exerciseTime || 0} 
            totalvalue={latestData?.targetExerciseTime || 0} 
            measure="min" 
          />
          <h1 className='font-semibold text-md text-green-500 mt-5'>
            {statusMessage}
          </h1>
        </CardContent>
      </Card>
    );
  }, [latestData, handleManualReset]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">📈 Progress
        <svg height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1418 125"><path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z" fill="#4EFF02"></path></svg>
      </h1>
      
      <div className="grid lg:grid-cols-3 gap-4 my-5">
        {cardContent}
        <Suspense fallback={<Loading />}>
          <PieComponent /> {/* PieChart Rendering here */}
          <ChartComponent /> {/* CardComponent Rendering here */}
        </Suspense>
      </div>
    </div>
  )
}