import { connectToDatabase } from '../config/database';
import { UserModel } from '../models/user';
import { TeamModel } from '../models/team';
import { ActivityModel } from '../models/activity';
import { LeaderboardModel } from '../models/leaderboard';
import { WorkoutModel } from '../models/workout';

/**
 * Seed the octofit_db database with test data
 */
export async function seedDatabase() {
  try {
    await connectToDatabase();

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.create([
      {
        name: 'Ava Chen',
        email: 'ava@example.com',
        fitnessLevel: 'advanced',
        goals: ['marathon', 'strength'],
      },
      {
        name: 'Noah Patel',
        email: 'noah@example.com',
        fitnessLevel: 'intermediate',
        goals: ['mobility', 'weight-loss'],
      },
      {
        name: 'Mina Ortiz',
        email: 'mina@example.com',
        fitnessLevel: 'beginner',
        goals: ['consistency'],
      },
    ]);

    await TeamModel.create([
      { name: 'Storm Squad', members: 4, sport: 'running' },
      { name: 'Trail Blazers', members: 3, sport: 'cycling' },
    ]);

    await ActivityModel.create([
      { userId: users[0]._id, type: 'run', durationMinutes: 35, distanceKm: 5.2 },
      { userId: users[1]._id, type: 'strength', durationMinutes: 45, distanceKm: 0 },
      { userId: users[2]._id, type: 'walk', durationMinutes: 25, distanceKm: 2.1 },
    ]);

    await LeaderboardModel.create([
      { userId: users[0]._id, userName: 'Ava Chen', score: 980, streak: 12 },
      { userId: users[1]._id, userName: 'Noah Patel', score: 945, streak: 8 },
      { userId: users[2]._id, userName: 'Mina Ortiz', score: 890, streak: 5 },
    ]);

    await WorkoutModel.create([
      { title: 'Tempo Run', difficulty: 'Intermediate', durationMinutes: 35, focus: 'cardio' },
      { title: 'Core Blast', difficulty: 'Beginner', durationMinutes: 20, focus: 'core' },
      { title: 'Power Cycle', difficulty: 'Advanced', durationMinutes: 40, focus: 'endurance' },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
