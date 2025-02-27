import dbConnect from "@/lib/mongodb";
import Routine from "@/models/Routine";

export async function PUT(req) {
  if(req.method === 'PUT'){
    await dbConnect();
  }
  try {
    const { id, detail } = await req.json();
    const routine = await Routine.findByIdAndUpdate(
      id,
      { $push: { details: detail } },
      { new: true }
    );
    return new Response(JSON.stringify(routine), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating routine:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
