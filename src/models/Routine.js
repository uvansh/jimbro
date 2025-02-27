import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
    exerciseName: { type: String, required: true },
    exerciseTime: { type: Number, default: 0 },
    checked: { type: Boolean, default: false },
});

const DetailSchema = new mongoose.Schema({
    day: { type: String, required: true },
    muscle: { type: String, required: true },
    exercises: [ExerciseSchema],
});

const RoutineSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Top-level name for the routine
    details: [DetailSchema], // Array of day/muscle/exercises
});

const Routine = mongoose.models.Routine || mongoose.model("Routine", RoutineSchema);
export default Routine;