import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const LeaderboardModel = model('Leaderboard', leaderboardSchema);
