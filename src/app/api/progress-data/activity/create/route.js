import dbConnect from "@/lib/mongodb";
import DailyActivity from "@/models/DailyActivity";

export async function POST(req,res) {
  console.log("POST /api/progress-data/activity/create hit");
  try {
    await dbConnect();

    const { targetCaloriesIntake, targetExerciseTime } = await req.json();
    console.log("Creating/updating targets with:", { targetCaloriesIntake, targetExerciseTime });

    const today = new Date().setUTCHours(0, 0, 0, 0);
    const activity = await DailyActivity.findOneAndUpdate(
      { date: today },
      {
        $set: {
          targetCalories: targetCaloriesIntake || 0,
          targetExerciseTime: targetExerciseTime || 0,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          caloriesIntake: 0, // Default value if document is created
          exerciseTime: 0, // Default value if document is created
        },
      },
      { upsert: true, new: true } // Create if not exists
    );

    return new Response(JSON.stringify(activity), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /api/progress-data/activity/create:", error);
    return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}