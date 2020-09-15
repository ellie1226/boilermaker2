// apiRoutes/index.js
const router = require("express").Router();

//this is for mounting page
router.use('/user', require('./user')); // matches all requests to /api/users/
// router.use('/puppies', require('./puppies')); // matches all requests to  /api/puppies/
// router.use('/kittens', require('./kittens')); // matches all requests to  /api/kittens/

// Sloths?!?! Get outta town! if route doesn't exists it will automatically go here
//404 error handling
router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
