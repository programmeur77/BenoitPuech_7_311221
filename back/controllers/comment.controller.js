const { restart } = require('nodemon');
const db = require('./../config/db');

exports.getCommentCount = (req, res) => {
  const getCountQuery = `SELECT COUNT(id) FROM comments WHERE postId = ${req.params.postId} AND active = 1`;

  db.query(getCountQuery, (error, result) => {
    if (!error) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json(error);
    }
  });
};

exports.getAllComments = (req, res) => {
  const firstGetJoinQuery = `SELECT firstName, lastName, comments.id, comments.commentContent, comments.comment_date FROM user JOIN comments ON user.id = comments.userId WHERE postId = ${req.params.postId} AND active = true`;

  db.query(firstGetJoinQuery, (error, result) => {
    if (!error) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(error);
    }
  });
};

exports.postComment = (req, res) => {
  const postCommentQuery = `INSERT INTO comments (userId, postId, commentContent) VALUES(${req.body.userId}, ${req.body.postId}, "${req.body.commentContent}")`;
  db.query(postCommentQuery, (error, result) => {
    if (!error) {
      return res.status(201).json(result.affectedRows);
    } else {
      return res.status(500).json([error]);
    }
  });
};
exports.modifyComment = (req, res) => {
  const commentModifyQuery = `UPDATE comments SET commentContent = "${req.body.commentContent}" WHERE id = ${req.params.commentId} AND userId = ${req.body.userId}`;
  if (req.body.userId === req.auth.userId) {
    db.query(commentModifyQuery, (error, result) => {
      if (!error) {
        return res
          .status(201)
          .json({ message: 'Comment sucessfully modified' });
      } else {
        return res.status(500).json(error);
      }
    });
  } else {
    res.status(401).json({
      message: 'Unauthorized request. Please authenticate yourself first'
    });
  }
};

exports.deleteComment = (req, res) => {
  const commentGetQuery = `SELECT userId FROM comments WHERE id = ${req.params.id}`;
  const commentDeleteQuery = `UPDATE comments SET active = 0 WHERE id = ${req.params.id}`;

  db.query(commentGetQuery, (error, result) => {
    if (!error) {
      if (result[0].userId === req.auth.userId) {
        db.query(commentDeleteQuery, (err, rslt) => {
          if (!error) {
            return res.status(200).json({ message: 'Comment deleted' });
          } else {
            return res.status(500).json({ error });
          }
        });
      } else {
        return res.status(401).json({ message: 'Unauthorized request' });
      }
    } else {
      res.status(500).json({ error });
    }
  });
};
