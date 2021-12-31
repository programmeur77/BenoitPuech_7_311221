const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./../config/db');

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
  console.log(req.body.email);
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
          token: 'TOKEN'
        });
      })
      .catch((error) => res.status(500).error({ error }));
  });
};
