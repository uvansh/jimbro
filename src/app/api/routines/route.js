import dbConnect from "@/lib/mongodb";
import Routine from "@/models/Routine";

export async function GET() {
  try {
    console.log("GET /api/routines hit");
    await dbConnect();
    const routines = await Routine.find({}) || "No record found.";
    return new Response(JSON.stringify(routines), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET /api/routines:", error);
    return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), {
      status: 500,
      headers: {"Content-Type":"application/json"},
    });
  }
}