const express = require('express');

const log = require('./log');
const st = require('./token');
const { mustLogin } = require('./middlewares');

const {
  getUsersPost,
  getUsersSpecPost,
  getPostComments,
  editPost,
  addPost,
  removeUserPost,
  addComment,
} = require('./controller');
const router = express.Router();

router.get('/posts', getUsersPost);
router.get('/posts/:id', getUsersSpecPost);
router.get('/posts/:id/comments', getPostComments);

router.post('/posts/post', mustLogin, addPost);
router.post('/comment', mustLogin, addComment);

router.put('/posts/:id', mustLogin, editPost);

router.delete('/posts/:id', mustLogin, removeUserPost);

module.exports = router;
