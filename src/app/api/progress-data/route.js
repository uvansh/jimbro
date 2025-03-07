import dbConnect from '@/lib/mongodb';
import DailyActivity from '@/models/DailyActivity';

export async function GET(req){
    if(req.method!=='GET') return
    try{
        console.log("GET /api/routines hit");
        await dbConnect();
        const getAnalysis = await DailyActivity.find({}) || "No record Found.";
        return new Response(JSON.stringify(getAnalysis),{
            status:200,
            headers:{"Content-Type":"application/json"},
        });
    }catch(error){
        console.log("Error:",error);
        return new Response((JSON.stringify({message:"Something went wrong",error:error.message})),{
            status:500,
            headers:{"Content-Type":"application/json"},
        })
    }
}