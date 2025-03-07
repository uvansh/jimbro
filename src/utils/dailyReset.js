import dbConnect from "@/lib/mongodb";
import DailyActivity from "@/models/DailyActivity";

/**
 * Checks if the current day's activity needs to be reset and creates a new document if needed
 * This should be called when fetching daily activity data
 */
export async function checkAndResetDailyActivity() {
  try {
    await dbConnect();
    
    // Get today's date with time set to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if we already have an entry for today
    const todayActivity = await DailyActivity.findOne({ date: today });
    
    // If we already have today's entry, just return it
    if (todayActivity) {
      return todayActivity;
    }
    
    // If we don't have today's entry, we need to create one
    // First, find the most recent activity to get target values
    const latestActivity = await DailyActivity.findOne().sort({ date: -1 });
    
    // Default target values
    let targetCalories = 0;
    let targetExerciseTime = 0;
    
    // If we have previous activity, use its target values
    if (latestActivity) {
      targetCalories = latestActivity.targetCalories;
      targetExerciseTime = latestActivity.targetExerciseTime;
      
      // Check if the latest activity is from yesterday or older
      const latestDate = new Date(latestActivity.date);
      const dayDifference = Math.floor((today - latestDate) / (1000 * 60 * 60 * 24));
      
      // If it's more than 1 day old, reset targets to 0 as well
      if (dayDifference > 1) {
        targetCalories = 0;
        targetExerciseTime = 0;
      }
    }
    
    // Create new activity for today with zeroed counters
    const newTodayActivity = await DailyActivity.create({
      date: today,
      caloriesIntake: 0,
      exerciseTime: 0,
      targetCalories: targetCalories,
      targetExerciseTime: targetExerciseTime,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return newTodayActivity;
  } catch (error) {
    console.error("Error in checkAndResetDailyActivity:", error);
    throw error;
  }
} 