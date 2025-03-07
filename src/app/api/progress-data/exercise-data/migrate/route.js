import dbConnect from '@/lib/mongodb';
import { ExerciseType } from '@/models/ProgressData';

// This is a one-time migration endpoint to fix any existing data
export async function GET(req) {
  try {
    await dbConnect();
    
    // Find all exercise type documents
    const exerciseDocs = await ExerciseType.find({});
    
    if (exerciseDocs.length === 0) {
      return new Response(JSON.stringify({ message: "No documents found to migrate" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Process each document
    const results = [];
    
    for (const doc of exerciseDocs) {
      const original = { ...doc.toObject() };
      let changed = false;
      
      // Convert string values to numbers
      if (doc.Chest && typeof doc.Chest === 'string') {
        doc.Chest = Number(doc.Chest) || 0;
        changed = true;
      }
      
      if (doc.Shoulders && typeof doc.Shoulders === 'string') {
        doc.Shoulders = Number(doc.Shoulders) || 0;
        changed = true;
      }
      
      if (doc.Legs && typeof doc.Legs === 'string') {
        doc.Legs = Number(doc.Legs) || 0;
        changed = true;
      }
      
      if (doc.Abs && typeof doc.Abs === 'string') {
        doc.Abs = Number(doc.Abs) || 0;
        changed = true;
      }
      
      if (doc.Arms && typeof doc.Arms === 'string') {
        doc.Arms = Number(doc.Arms) || 0;
        changed = true;
      }
      
      if (doc.Back && typeof doc.Back === 'string') {
        doc.Back = Number(doc.Back) || 0;
        changed = true;
      }
      
      if (doc.Cardio && typeof doc.Cardio === 'string') {
        doc.Cardio = Number(doc.Cardio) || 0;
        changed = true;
      }
      
      // Save if changed
      if (changed) {
        await doc.save();
        results.push({
          id: doc._id.toString(),
          original,
          updated: doc.toObject(),
        });
      }
    }
    
    return new Response(JSON.stringify({ 
      message: `Migration completed. ${results.length} documents updated.`,
      results 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error during migration:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 