const express = require('express');
const app = express();
const router = express.Router();

const db = require('./config/db');
const userRoutes = require('./routes/user.routes');
const publicationRoutes = require('./routes/publication.routes');
const commentRoutes = require('./routes/comment.routes');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;
