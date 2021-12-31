const express = require('express');
const app = express();
const router = express.Router();

const db = require('./config/db');
const userRoutes = require('./routes/user.routes');
const publicationRoutes = require('./routes/publication.routes')

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/publications', publicationRoutes)
module.exports = app;
