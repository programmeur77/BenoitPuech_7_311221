const express = require('express');
const router = express.Router();

const userCtrl = require('./../controllers/user.controller');
const auth = require('./../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getProfile);
router.put('/:id', auth, userCtrl.modifyProfile);
router.delete('/:id', auth, userCtrl.deleteProfile);

module.exports = router;
