const express = require('express');
const router = express.Router();

const publicationCtrl = require('../controllers/publication.controller');
const auth = require('./../middleware/auth');

router.get('/', auth, publicationCtrl.getAllPublications);
router.post('/post', auth, publicationCtrl.postPublication);
router.get('/:id', auth, publicationCtrl.getOnePublication);
router.put('/:id', auth, publicationCtrl.updatePublication);
router.delete('/:id', auth, publicationCtrl.deletePublication);

module.exports = router;
