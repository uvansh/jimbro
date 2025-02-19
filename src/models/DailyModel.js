import mongoose from 'mongoose';

const dailySchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },
  workoutTime: { type: Number, default: 0 },
  caloriesIntake: { type: Number, default: 0 },
});

const DailyModel =
  mongoose.models.Daily || mongoose.model('Daily', dailySchema);

export default DailyModel;