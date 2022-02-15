const { getPosts, addNewPost, getSpecPost } = require('../models/posts.model');

function getUsersPost(req, res, next) {
  res.send(getPosts());
}

function getUsersSpecPost(req, res, next) {
  if (!getSpecPost(Number(req.params.id))) {
    res.status(400).send({ error: 'There are not such id post' });
  }
  res.send(getSpecPost(Number(req.params.id)));
}

function getPostComments(req, res, next) {
  if (!getSpecPost(Number(req.params.id))) {
    res.status(400).send({ error: 'There are not such id comments' });
  }
  const post = getSpecPost(Number(req.params.id));
  res.send(post['comments']);
}

function addPost(req, res, next) {
  const posts = getPosts();
  const filteredPost = posts.filter((post) => post['userId'] === +req.userId);
  const newPostId = +req.userId;
  let newPost = {
    userId: newPostId,
    id: filteredPost[filteredPost.length - 1].id + 1,
  };
  newPost = Object.assign(newPost, req.body);
  filteredPost.push(newPost);
  addNewPost(filteredPost, req.userId);
  res.send(newPost);
}

function editPost(req, res, next) {
  const postId = req.params.id;
  const userId = req.userId;
  const posts = getPosts().filter((post) => post.userId === +userId);
  posts.find((post) => post['id'] === +postId).title = req.body.title;
  addNewPost(posts, userId);
  res.send('The post change was saved');
}

function removeUserPost(req, res, next) {
  const postId = req.params.id;
  const userId = req.userId;
  const posts = getPosts().filter((post) => post.userId === +userId);
  const removedPostIndex = posts.findIndex((post) => post['id'] === +postId);
  if (removedPostIndex < 0) {
    const err = new Error('The post dont found');
    err.statusCode = 401;
    next(err);
  } else {
    posts.splice(removedPostIndex, 1);
    addNewPost(posts, userId);
    res.send('The post removed');
  }
}

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
  req.send('Comment added');
}

module.exports = {
  getSpecPost,
  addPost,
  editPost,
  getUsersPost,
  getUsersSpecPost,
  getPostComments,
  removeUserPost,
  addComment,
};
