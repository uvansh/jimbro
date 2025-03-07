import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
    caloriesIntake: {
        type: Number,
        default: 0
    },
    exerciseTime: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    exerciseType: {
        type: String,
        default: '',
    },
});

const ExerciseTypeSchema = new mongoose.Schema({
    Chest: {
        type: Number,
        default: 0
    },
    Shoulders: {
        type: Number,
        default: 0,
    },
    Legs: {
        type: Number,
        default: 0,
    },
    Abs: {
        type: Number,
        default: 0,
    },
    Arms: {
        type: Number,
        default: 0,
    },
    Back: {
        type: Number,
        default: 0,
    },
    Cardio: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

// Add pre-save middleware to update the updatedAt field
ProgressSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Add pre-save middleware to ensure all exercise type values are numbers
ExerciseTypeSchema.pre('save', function (next) {
    // Convert string values to numbers
    if (this.Chest && typeof this.Chest === 'string') this.Chest = Number(this.Chest) || 0;
    if (this.Shoulders && typeof this.Shoulders === 'string') this.Shoulders = Number(this.Shoulders) || 0;
    if (this.Legs && typeof this.Legs === 'string') this.Legs = Number(this.Legs) || 0;
    if (this.Abs && typeof this.Abs === 'string') this.Abs = Number(this.Abs) || 0;
    if (this.Arms && typeof this.Arms === 'string') this.Arms = Number(this.Arms) || 0;
    if (this.Back && typeof this.Back === 'string') this.Back = Number(this.Back) || 0;
    if (this.Cardio && typeof this.Cardio === 'string') this.Cardio = Number(this.Cardio) || 0;
    
    next();
});

// Check if the models exist before creating them
const Progress = mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
const ExerciseType = mongoose.models.ExerciseType || mongoose.model('ExerciseType', ExerciseTypeSchema);

// Export both models
export { Progress, ExerciseType };