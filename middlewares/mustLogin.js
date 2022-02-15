const { usersId } = require('../models/posts.model');

module.exports.mustLogin = (req, res, next) => {
  const userId = req.get('userId');
  const usersIdData = usersId();
  if (usersIdData.includes(userId)) {
    req.userId = userId;
    next();
  } else {
    const err = new Error('must login');
    err.statusCode = 401;
    next(err);
  }
  console.log('returning');
};
