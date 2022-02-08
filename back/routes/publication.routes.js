const express = require('express');
const router = express.Router();

const publicationCtrl = require('../controllers/publication.controller');
const auth = require('./../middleware/auth');
const multer = require('./../middleware/multer-config');

router.get('/', auth, publicationCtrl.getAllPublications);
router.post('/post', auth, multer, publicationCtrl.postPublication);
router.get('/:id', auth, multer, publicationCtrl.getOnePublication);
router.put('/:id', auth, multer, publicationCtrl.modifyPublication);
router.delete('/:id', auth, publicationCtrl.deletePublication);

module.exports = router;