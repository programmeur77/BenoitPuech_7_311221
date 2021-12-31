const express = require('express');
const app = express();
const router = express.Router();

const db = require('./config/db');
const userRoutes = require('./routes/user.routes');

app.use(express.json());

app.use('/api/auth', userRoutes);

module.exports = app;
