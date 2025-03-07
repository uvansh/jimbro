import dbConnect from '@/lib/mongodb';
import { ExerciseType } from '@/models/ProgressData';

export async function POST(req) {
  try {
    await dbConnect();
    
    // Extract the category from the request body
    const { category } = await req.json();
    
    console.log("Incrementing category:", category);
    
    if (!category) {
      return new Response(JSON.stringify({ error: "Category is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Find the current document
    let exerciseDoc = await ExerciseType.findOne({});
    
    if (!exerciseDoc) {
      // If no document exists, create a new one with all categories initialized to numbers
      exerciseDoc = new ExerciseType({
        Chest: 0,
        Shoulders: 0,
        Legs: 0,
        Abs: 0,
        Arms: 0,
        Back: 0,
        Cardio: 0
      });
    }
    
    // Get the current value, convert to number if it's a string
    const currentValue = typeof exerciseDoc[category] === 'string' 
      ? parseInt(exerciseDoc[category]) || 0 
      : (exerciseDoc[category] || 0);
    
    // Increment the value
    exerciseDoc[category] = currentValue + 1;
    
    // Save the document
    await exerciseDoc.save();
    
    console.log("Updated workout:", exerciseDoc);
    
    return new Response(JSON.stringify(exerciseDoc), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error incrementing workout:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const data = await ExerciseType.findOne();
    console.log("Exercise data:", data);
    return new Response(JSON.stringify(data || {}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}