import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    members: { type: Number, default: 0 },
    sport: { type: String, default: 'fitness' },
  },
  { timestamps: true },
);

export const TeamModel = model('Team', teamSchema);
