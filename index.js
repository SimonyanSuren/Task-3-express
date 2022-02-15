const express = require('express');
const router = require('./route');
const app = express();

app.use(express.json());
app.use(router);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).send(err.message);
});

app.listen(3000, () => {
  console.log(`server is running on: 3000`);
});
