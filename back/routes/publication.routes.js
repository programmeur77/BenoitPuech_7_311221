const express = require('express');
const router = express.Router();

const publicationCtrl = require('./../controllers/publication.controllers');
const auth = require('./../middleware/auth');

router.get('/', auth, publicationCtrl.getAllPublications);
router.post('/post', auth, publicationCtrl.postPublication);

module.exports = router;
