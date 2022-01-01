const db = require('./../config/db');

exports.getAllPublications = (req, res) => {
  const getAllPublicationsRequest =
    'SELECT lastName, firstName, posts.postContent, posts.imageUrl, posts.post_date FROM user JOIN posts on posts.userId = user.id';

  db.query(getAllPublicationsRequest, (error, result) => {
    if (!error) return res.status(200).json(result);
    else return res.status(500).json({ error });
  });
};
exports.postPublication = (req, res) => {
  const { userId, postContent } = req.body;

  var query = '';

  if (req.body.postContent === '' && req.body.imageUrl === '') {
    return res.status(204).json({ error: 'Empty content' });
  }

  if (req.body.postContent !== '' && req.body.imageUrl === null) {
    query = `INSERT INTO posts (userId, postContent) VALUES (${req.body.userId}, "${req.body.postContent}")`;
  } else if (req.body.postContent === '' && req.body.imageUrl !== '') {
    query = `INSERT INTO posts (userId, imageUrl) VALUES ("${req.body.userId}", "${req.body.imageUrl}")`;
  } else if (req.body.postContent !== '' && req.body.imageUrl !== '') {
    query = `INSERT INTO posts (userId, postContent, imageUrl) VALUES(${req.body.userId}, "${req.body.postContent}", "${req.body.imageUrl}")`;
  }

  db.query(query, (error, result) => {
    console.log('case 1');
    if (result) {
      return res.status(201).json({ message: 'Successfully posted' });
    } else {
      return res.status(500).json(error);
    }
  });
};
