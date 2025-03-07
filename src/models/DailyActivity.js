import mongoose from 'mongoose';

const DailyActivitySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: () => new Date().setUTCHours(0,0,0,0),
        index: true,
    },
    caloriesIntake:{
        type: Number,
        default: 0,
        min: 0,
    },
    targetCalories:{
        type: Number,
        default: 0,
        min: 0,
    },
    exerciseTime:{
        type: Number,
        default:0,
        min: 0,
    },
    targetExerciseTime:{
        type: Number,
        default: 0,
        min: 0,
    },
    createdAt:{
        type: Date,
        default: () => new Date(),
    },
    updatedAt:{
        type: Date,
        default: () => new Date(),
    },
});

// Remove duplicate index definition
// DailyActivitySchema.index({date:1},{unique:true});

// Check if the model exists before creating it
const DailyActivity = mongoose.models.DailyActivity || mongoose.model('DailyActivity', DailyActivitySchema);

export default DailyActivity;