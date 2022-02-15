const express = require('express');

const { mustLogin } = require('../middlewares/mustLogin');
const { addComment } = require('../controllers/comments.controller');

const router = express.Router();

router.post('/comment', mustLogin, addComment);

module.exports = router;
