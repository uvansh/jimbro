import dbConnect from '@/lib/mongodb';
import DailyActivity from '@/models/DailyActivity';
import { checkAndResetDailyActivity } from '@/utils/dailyReset';

export async function GET(req){
    if(req.method!=='GET') return
    try{
        console.log("GET /api/progress-data hit");
        await dbConnect();
        
        // Check and reset daily activity if needed (creates today's entry if it doesn't exist)
        await checkAndResetDailyActivity();
        
        // Get all activity records for history, sorted by date in descending order (newest first)
        const getAnalysis = await DailyActivity.find({})
            .sort({ date: -1 }) // Sort by date descending (newest first)
            .lean(); // Convert to plain JavaScript objects for better performance
        
        console.log("Returning data:", getAnalysis.length, "records");
        
        return new Response(JSON.stringify(getAnalysis),{
            status:200,
            headers:{
                "Content-Type":"application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        });
    }catch(error){
        console.log("Error:",error);
        return new Response((JSON.stringify({message:"Something went wrong",error:error.message})),{
            status:500,
            headers:{"Content-Type":"application/json"},
        })
    }
}