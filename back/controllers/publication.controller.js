const db = require('../config/db');

exports.getAllPublications = (req, res) => {
  const getAllPublicationsRequest =
    'SELECT user.id, lastName, firstName, posts.postContent, posts.imageUrl, posts.post_date FROM user JOIN posts ON posts.userId = user.id WHERE posts.active = 1';

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

  if (req.body.postContent !== '' && req.body.imageUrl === '') {
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

exports.getOnePublication = (req, res) => {
  const query = `SELECT user.id, firstName, lastName, posts.postContent, posts.imageUrl, posts.post_date FROM user JOIN posts ON posts.userId = user.id WHERE posts.id = ${req.params.id} AND active = 1`;

  db.query(query, (error, result) => {
    if (!error) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  });
};

exports.modifyPublication = (req, res) => {
  const updateQuery = `UPDATE posts SET postContent = "${req.body.postContent}", imageUrl = "${req.body.imageUrl}" WHERE id = ${req.params.id} AND userId = ${req.body.userId}`;

  if (req.body.userId === req.auth.userId) {
    if (req.body.postContent !== '' || req.body.imageUrl !== '') {
      db.query(updateQuery, (error, result) => {
        if (!error) {
          return res.status(200).json({ message: 'Post sucessfully updated' });
        } else {
          return res.status(500).json({ error });
        }
      });
    } else {
      return res
        .status(401)
        .json({ message: 'Cannot update with empty content' });
    }
  } else {
    return res.status(401).json({
      message: 'Unauthorized request. You must be authenticated first'
    });
  }
};

exports.deletePublication = (req, res) => {
  const selectQuery = `SELECT userId, admin FROM posts`;
  const updateQuery = `UPDATE posts SET active = 0 WHERE id = ${req.params.id}`;
  db.query(selectQuery, (error, result) => {
    if (!error) {
      if (result[0].admin === true) {
        db.query(updateQuery, (err, response) => {
          if (!error) {
            res.status(200).json({ message: 'Successfully deleted' });
          } else {
            res.status(500).json({ err });
          }
        });
      } else if (result[0].userId === req.auth.userId) {
        db.query(updateQuery, (err, response) => {
          if (!error) {
            res.status(200).json({ message: 'Successfully deleted' });
          } else {
            res.status(500).json({ err });
          }
        });
      } else {
        return res.status(401).json({
          message: 'Unauthorized request. You have to authenticate first'
        });
      }
    } else {
      return res.status(500).json({ error });
    }
  });
};
