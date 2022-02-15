const express = require('express');

const { mustLogin } = require('../middlewares/mustLogin');
const {
  getUsersPost,
  getUsersSpecPost,
  getPostComments,
  editPost,
  addPost,
  removeUserPost,
} = require('../controllers/posts.controller');

const router = express.Router();

// ============== GET methods ===================

router.get('/posts', getUsersPost);
router.get('/posts/:id', getUsersSpecPost);
router.get('/posts/:id/comments', getPostComments);
router.post('/posts/post', mustLogin, addPost);
router.put('/posts/:id', mustLogin, editPost);
router.delete('/posts/:id', mustLogin, removeUserPost);

module.exports = router;
