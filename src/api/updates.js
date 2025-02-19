import dbConnect from '@/lib/mongoose';
import DailyModel from '@/models/DailyModel'
import MonthlyModel from '@/models/MonthlyModel'

export default async function dailyUpdatesHandler(req,res){
      if (req.method === 'POST') {
        try {
          await dbConnect();
    
          const { workoutTime, caloriesIntake } = req.body;
    
          // Get the current month
          const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
          ];
          const currentMonth = months[new Date().getMonth()];
    
          // Update or create the document for the current month
          const updatedMonthly = await MonthlyModel.findOneAndUpdate(
            { month: currentMonth },
            { workoutTime, caloriesIntake },
            { upsert: true, new: true }
          );
    
          res.status(200).json({ message: 'Monthly data updated successfully', data: updatedMonthly });
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: 'Failed to update monthly data' });
        }
      }else if(req.method==='GET'){
        try{
            await dbConnect();
            const data = await DailyModel.find({});
            res.status(200).json(data);
        }catch(e){
            console.error(e);
            res.status(500).json({ error: 'Failed to update daily data' });
        }
      } 
      else {
        res.status(405).json({ error: 'Method not allowed' });
      }
}

export async function monthlyUpdatesHandler(req,res){
    if (req.method === 'POST') {
        try {
          await dbConnect();
    
          const { workoutTime, caloriesIntake } = req.body;
    
          // Get the current day
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const currentDay = days[new Date().getDay()];
    
          // Update or create the document for the current day
          const updatedDaily = await DailyModel.findOneAndUpdate(
            { day: currentDay },
            { workoutTime, caloriesIntake },
            { upsert: true, new: true }
          );
    
          res.status(200).json({ message: 'Daily data updated successfully', data: updatedDaily });
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: 'Failed to update daily data' });
        }
      } else if(req.method==='GET'){
        try {
            await dbConnect();
            const data = await MonthlyModel.find({});
            res.status(200).json(data);
          } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Failed to update daily data' });
          }
    } 
      else {
        res.status(405).json({ error: 'Method not allowed' });
      }
}