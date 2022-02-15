const { getPosts, addNewPost } = require('../models/posts.model');

function addComment(req, res, next) {
  const postId = +req.get('postId');
  const userId = req.userId;
  const posts = getPosts().filter((post) => post.userId === +userId);
  const postIndex = posts.findIndex((post) => post.id === +postId);
  const post = posts.find((post) => post.id === +postId);
  const newComment = {
    postId: +postId,
    id: post.comments[post.comments.length - 1].id + 1,
    name: req.body.name,
    email: post.comments[0].email,
    body: req.body.body,
  };
  posts[postIndex].comments.push(newComment);
  addNewPost(posts, userId);
  res.send('Comment added.');
}

module.exports = {
  addComment,
};
