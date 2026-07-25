import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, default: 'full-body' },
  },
  { timestamps: true },
);

export const WorkoutModel = model('Workout', workoutSchema);
