const express = require('express');
const router = express.Router();

const commentCtrl = require('./../controllers/comment.controller');
const auth = require('./../middleware/auth');

router.post('/post', auth, commentCtrl.postComment);
router.get('/:postId', auth, commentCtrl.getAllComments);
router.put('/:commentId/:userId', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
