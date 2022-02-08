const express = require('express');
const router = express.Router();

const userCtrl = require('./../controllers/user.controller');
const auth = require('./../middleware/auth');
const multer = require('./../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, multer, userCtrl.getProfile);
router.put('/:id', auth, multer, userCtrl.modifyProfile);
router.delete('/:id', auth, multer, userCtrl.deleteProfile);

module.exports = router;
