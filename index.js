const express = require('express');
const routerPosts = require('./routes/posts.route');
const routerComments = require('./routes/comments.route');
const apiError = require('./errors/api.error');

const app = express();

app.use(express.json());
app.use(routerPosts);
app.use(routerComments);

app.use(apiError);

app.listen(3000, () => {
  console.log(`server is running on: 3000`);
});
