import dbConnect from "@/lib/mongodb";
import DailyActivity from "@/models/DailyActivity";

export async function POST(req) {
  try {
    console.log("POST /api/progress-data/activity/update hit");
    await dbConnect();

    const { caloriesIntake, exerciseTime } = await req.json();
    console.log("Updating activity with:", { caloriesIntake, exerciseTime });

    const today = new Date().setUTCHours(0, 0, 0, 0);
    const activity = await DailyActivity.findOneAndUpdate(
      { date: today },
      {
        $inc: {
          caloriesIntake: caloriesIntake || 0,
          exerciseTime: exerciseTime || 0,
        },
        $setOnInsert: {
          targetCalories: 0, // Default value if document is created
          targetExerciseTime: 0, // Default value if document is created
        },
        updatedAt: new Date(), // Always update the updatedAt field
      },
      { upsert: true, new: true } // Create if not exists
    );

    return new Response(JSON.stringify(activity), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /api/progress-data/activity/update:", error);
    return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}