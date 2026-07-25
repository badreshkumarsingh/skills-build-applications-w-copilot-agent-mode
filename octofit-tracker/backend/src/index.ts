import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { connectToDatabase } from './config/database';

dotenv.config();

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 8000);
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.use('/api', routes);

connectToDatabase()
  .then(() => {
    console.log('Connected to octofit_db');
    app.listen(port, host, () => {
      console.log(`Backend listening on ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });
