const db = require('./../config/db');

exports.getAllPublications = (req, res) => {
  const getAllPublicationsRequest =
    'SELECT lastName, firstName, posts.postContent, posts.post_date FROM user JOIN posts on posts.userId = user.id';

  db.query(getAllPublicationsRequest, (error, result) => {
    if (!error) return res.status(200).json(result);
    else return res.status(500).json({ error });
  });
};
exports.postPublication = (req, res) => {
  const { userId, postContent } = req.body;
  const publicationPostRequest = `INSERT INTO posts VALUES (null, ${req.body.userId}, '${req.body.postContent}', null, NOW())`;

  db.query(publicationPostRequest, (error, result) => {
    if (result) {
      return res.status(201).json({ message: 'Successfully posted' });
    } else {
      return res.status(500).json(error);
    }
  });
};
