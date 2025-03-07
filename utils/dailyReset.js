import { DailyActivity } from '@/models/DailyActivity';
import { ProgressData } from '@/models/ProgressData';
import dbConnect from '@/lib/mongodb';

export async function resetDailyActivities() {
    await dbConnect();

    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);

        const endOfYesterday = new Date(yesterday);
        endOfYesterday.setHours(23, 59, 59, 999);

        const activities = await DailyActivity.find({
            date: {
                $gte: yesterday,
                $lte: endOfYesterday
            }
        });
        
        for (const activity of activities) {
            await ProgressData.create({
                date: activity.date,
                caloriesIntake: activity.caloriesIntake,
                targetCalories: activity.targetCalories,
                exerciseTime: activity.exerciseTime,
                targetExerciseTime: activity.targetExerciseTime,
                achievedCalorieGoal: activity.caloriesIntake <= activity.targetCalories,
                achievedExerciseGoal: activity.exerciseTime >= activity.targetExerciseTime
            })
        }
    }catch(error){
        console.error('Error during daily reset:',error);
    }
}