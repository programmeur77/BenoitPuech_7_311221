const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');

const db = require('./../config/db');
const { deletePublication } = require('./publication.controller');

exports.signup = (req, res) => {
  const { lastName, firstName, email, password } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const insertQuery = `INSERT INTO user (firstName, lastName, email, password) VALUES ('${req.body.lastName}', '${req.body.firstName}', '${req.body.email}', '${hash}')`;
      db.query(insertQuery, (error, result) => {
        if (result) {
          res.status(201).json({ message: 'Successfully registered' });
        } else if (error) {
          throw Error(error);
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const selectUserQuery = `SELECT id, email, password FROM user WHERE email = '${req.body.email}'`;

  db.query(selectUserQuery, function (error, result, field) {
    if (!result.length) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userPassword = result[0].password;
    bcrypt
      .compare(req.body.password, userPassword)
      .then((valid) => {
        if (!valid) {
          return res.status(404).json({ message: 'Incorrect password' });
        }
        res.status(200).json({
          userId: result[0].id,
          token: jwt.sign({ userId: result[0].id }, process.env.JWT_STRING, {
            expiresIn: '24h'
          })
        });
      })
      .catch((error) => res.status(500).error({ error }));
  });
};

exports.getProfile = (req, res) => {
  const getProfileQuery = `SELECT id, lastName, firstName, email, avatarUrl, signup_date FROM user WHERE id = ${req.params.id} AND active = 1`;

  db.query(getProfileQuery, (error, result) => {
    if (!error) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(error);
    }
  });
};

exports.modifyProfile = (req, res) => {
  const modifyProfileQuery = `UPDATE user SET lastName = "${req.body.lastName}", firstName = "${req.body.firstName}", avatarUrl = "${req.body.avatarUrl}" WHERE id = ${req.body.userId}`;
  if (req.body.userId === req.auth.userId) {
    db.query(modifyProfileQuery, (error, result) => {
      if (!error) {
        return res.status(201).json({ message: 'Sucessfully updated' });
      } else {
        return res.status(400).json({ error });
      }
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized request.' });
  }
};

exports.deleteProfile = (req, res) => {
  const getAdminStatusQuery = `SELECT id, admin FROM user WHERE id = ${req.params.id}`;
  const deleteProfileQuery = `UPDATE user SET active = 0 WHERE id = ${req.params.id}`;

  db.query(getAdminStatusQuery, (error, result) => {
    if (result[0].admin == 1) {
      db.query(deleteProfileQuery, (error, result) => {
        if (!error) {
          return res
            .status(200)
            .json({ message: 'Sucessfully desactivated profile' });
        } else {
          return res.status(500).json(error);
        }
      });
    } else if (result[0].id === req.auth.userId) {
      db.query(deleteProfileQuery, (error, result) => {
        if (!error) {
          return res
            .status(200)
            .json({ message: 'Sucessfully desactivated profile' });
        } else {
          return res.status(500).json(error);
        }
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized request' });
    }
  });
};
