const { getPosts, addNewPost } = require('../models/posts.model');

function addComment(res, req, next) {
  const postId = +res.get('postId');
  const userId = res.userId;
  const posts = getPosts().filter((post) => post.userId === +userId);
  const postIndex = posts.findIndex((post) => post.id === +postId);
  const post = posts.find((post) => post.id === +postId);
  const newComment = {
    postId: +postId,
    id: post.comments[post.comments.length - 1].id + 1,
    name: res.body.name,
    email: post.comments[0].email,
    body: res.body.body,
  };
  posts[postIndex].comments.push(newComment);
  addNewPost(posts, userId);
  req.send('Comment already have been added');
}

module.exports = {
  addComment,
};
