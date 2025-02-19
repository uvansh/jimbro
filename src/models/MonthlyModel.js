import mongoose from 'mongoose';

const monthlySchema = new mongoose.Schema({
  month: { type: String, required: true, unique: true },
  workoutTime: { type: Number, default: 0 },
  caloriesIntake: { type: Number, default: 0 },
});

const MonthlyModel =
  mongoose.models.Monthly || mongoose.model('Monthly', monthlySchema);

export default MonthlyModel;