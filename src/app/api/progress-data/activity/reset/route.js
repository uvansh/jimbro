import dbConnect from "@/lib/mongodb";
import DailyActivity from "@/models/DailyActivity";

export async function POST(req) {
  try {
    console.log("POST /api/progress-data/activity/reset hit");
    await dbConnect();

    // Get today's date with time set to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Create or update today's document with zeroed counters AND targets
    const todayActivity = await DailyActivity.findOneAndUpdate(
      { date: today },
      {
        $set: {
          caloriesIntake: 0,
          exerciseTime: 0,
          targetCalories: 0,
          targetExerciseTime: 0,
          updatedAt: new Date()
        }
      },
      { upsert: true, new: true }
    );

    console.log("Reset successful, new values:", {
      caloriesIntake: todayActivity.caloriesIntake,
      exerciseTime: todayActivity.exerciseTime,
      targetCalories: todayActivity.targetCalories,
      targetExerciseTime: todayActivity.targetExerciseTime,
      date: todayActivity.date
    });

    return new Response(JSON.stringify(todayActivity), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      },
    });
  } catch (error) {
    console.error("Error in POST /api/progress-data/activity/reset:", error);
    return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 