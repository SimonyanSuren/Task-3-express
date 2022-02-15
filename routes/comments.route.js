const express = require('express');

const { mustLogin } = require('../middlewares/mustLogin');

const { addComment } = require('../controllers/posts.controller');

const router = express.Router();

router.post('/comment', mustLogin, addComment);

module.exports = router;
