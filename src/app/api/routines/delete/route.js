import dbConnect from "@/lib/mongodb";
import Routine from '@/models/Routine';

export async function DELETE(req){
    if(req.method !== 'DELETE')
    return new Response(JSON.stringify({message:"Method not allowed."}),{
        status:405,
        headers:{"Content-Type":"application/json"},
    })

    try{
        await dbConnect();
        const {id} = await req.json();

        await Routine.findByIdAndDelete(id);
        return new Response(JSON.stringify({message:"Routine deleted successfully."}),{
            status:200,
            headers:{"Content-Type":"application/json"},
        });
    } catch(error){
        console.log("Error deleting routine:",error);
        return new Response(JSON.stringify({message:"Error deleting routine."}),{
            status:500,
            headers:{"Content-Type":"application/json"},
        });
    }
}