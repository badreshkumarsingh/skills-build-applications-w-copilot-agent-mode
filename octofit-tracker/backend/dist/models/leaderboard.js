"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardModel = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
exports.LeaderboardModel = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
