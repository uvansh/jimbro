import dbConnect from '@/lib/mongodb';
import { ExerciseType } from '@/models/ProgressData';

export async function POST(category) {
  try {
    await dbConnect();
    const updatedWorkout = await ExerciseType.findOneAndUpdate(
      {}, // Assuming one document for all counts; adjust if multiple users/documents
      { $inc: { [category]: 1 } }, // Dynamically increment the passed category
      { new: true, upsert: true } // Return the updated doc, create if it doesn’t exist
    );
    return new Response(JSON.stringify(updatedWorkout), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error incrementing workout:', error);
  }
}

export async function GET(res, req) {
  try {
    await dbConnect();
    const data = await ExerciseType.findOne();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}