import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, default: 'intermediate' },
    goals: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const UserModel = model('User', userSchema);
