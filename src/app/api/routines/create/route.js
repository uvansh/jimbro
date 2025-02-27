import dbConnect from "@/lib/mongodb";
import Routine from "@/models/Routine";

export async function POST(req) {
  try {
    console.log("POST /api/routines/create hit");
    await dbConnect();
    const { name, details } = await req.json();
    console.log("Creating routine with:", { name, details });
    const routine = new Routine({ name, details: details || [] });
    const savedRoutine = await routine.save();
    return new Response(JSON.stringify(savedRoutine), {
      status: 201,
      method:"POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /api/routines/create:", error);
    return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), {
      status: 500,
    });
  }
}