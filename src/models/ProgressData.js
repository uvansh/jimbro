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
        type: String,
        default: 0
    },
    Shoulders: {
        type: String,
        default: 0,
    },
    Legs: {
        type: String,
        default: 0,
    },
    Abs: {
        type: String,
        default: 0,
    },
    Arms: {
        type: String,
        default: 0,
    },
    Back: {
        type: String,
        default: 0,
    },
    Cardio: {
        type: String,
        default: 0,
    }
    },{ timestamps: true });

// Add pre-save middleware to update the updatedAt field
ProgressSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Progress', ProgressSchema);
module.exports = mongoose.model('ExerciseType', ExerciseTypeSchema);