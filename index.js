const express = require('express');
const routerPosts = require('./routes/posts.route');
const routerComments = require('./routes/comments.route')
const app = express();

app.use(express.json());
app.use(routerPosts);
app.use(routerComments)
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).send(err.message);
});

app.listen(3000, () => {
  console.log(`server is running on: 3000`);
});
