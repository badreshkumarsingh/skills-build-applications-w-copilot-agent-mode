"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 8000);
const apiBaseUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.use('/api', routes_1.default);
(0, database_1.connectToDatabase)()
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
