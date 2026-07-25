"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const router = (0, express_1.Router)();
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
};
const buildCollectionResponse = (path, items) => ({
    apiUrl: `${getApiBaseUrl()}${path}`,
    count: items.length,
    items,
});
router.get('/', (_req, res) => {
    res.json({
        service: 'octofit-backend',
        apiBaseUrl: getApiBaseUrl(),
        endpoints: [
            '/api/users/',
            '/api/teams/',
            '/api/activities/',
            '/api/leaderboard/',
            '/api/workouts/',
        ],
    });
});
router.get('/users', async (_req, res) => {
    const users = await user_1.UserModel.find({}).lean();
    res.json(buildCollectionResponse('/api/users/', users));
});
router.get('/users/', async (_req, res) => {
    const users = await user_1.UserModel.find({}).lean();
    res.json(buildCollectionResponse('/api/users/', users));
});
router.post('/users', async (req, res) => {
    const user = await user_1.UserModel.create({
        name: req.body.name || 'New User',
        email: req.body.email || 'new@example.com',
        fitnessLevel: req.body.fitnessLevel || 'intermediate',
        goals: req.body.goals || [],
    });
    res.status(201).json(user);
});
router.get('/teams', async (_req, res) => {
    const teams = await team_1.TeamModel.find({}).lean();
    res.json(buildCollectionResponse('/api/teams/', teams));
});
router.get('/teams/', async (_req, res) => {
    const teams = await team_1.TeamModel.find({}).lean();
    res.json(buildCollectionResponse('/api/teams/', teams));
});
router.post('/teams', async (req, res) => {
    const team = await team_1.TeamModel.create({
        name: req.body.name || 'New Team',
        members: req.body.members || 1,
        sport: req.body.sport || 'fitness',
    });
    res.status(201).json(team);
});
router.get('/activities', async (_req, res) => {
    const activities = await activity_1.ActivityModel.find({}).lean();
    res.json(buildCollectionResponse('/api/activities/', activities));
});
router.get('/activities/', async (_req, res) => {
    const activities = await activity_1.ActivityModel.find({}).lean();
    res.json(buildCollectionResponse('/api/activities/', activities));
});
router.post('/activities/', async (req, res) => {
    const activity = await activity_1.ActivityModel.create({
        userId: req.body.userId || null,
        type: req.body.type || 'workout',
        durationMinutes: req.body.durationMinutes || 20,
        distanceKm: req.body.distanceKm || 0,
    });
    res.status(201).json(activity);
});
router.get('/leaderboard', async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardModel.find({}).lean();
    res.json(buildCollectionResponse('/api/leaderboard/', leaderboard));
});
router.get('/leaderboard/', async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardModel.find({}).lean();
    res.json(buildCollectionResponse('/api/leaderboard/', leaderboard));
});
router.post('/leaderboard', async (req, res) => {
    const entry = await leaderboard_1.LeaderboardModel.create({
        userId: req.body.userId || null,
        userName: req.body.userName || 'New User',
        score: req.body.score || 0,
        streak: req.body.streak || 0,
    });
    res.status(201).json(entry);
});
router.get('/workouts', async (_req, res) => {
    const workouts = await workout_1.WorkoutModel.find({}).lean();
    res.json(buildCollectionResponse('/api/workouts/', workouts));
});
router.get('/workouts/', async (_req, res) => {
    const workouts = await workout_1.WorkoutModel.find({}).lean();
    res.json(buildCollectionResponse('/api/workouts/', workouts));
});
router.post('/workouts/', async (req, res) => {
    const workout = await workout_1.WorkoutModel.create({
        title: req.body.title || 'New Workout',
        difficulty: req.body.difficulty || 'Beginner',
        durationMinutes: req.body.durationMinutes || 20,
        focus: req.body.focus || 'full-body',
    });
    res.status(201).json(workout);
});
exports.default = router;
