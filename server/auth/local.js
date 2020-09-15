const router = require("express").Router();
const User = require("../db/User");

// This marries the original auth code we wrote to Passport.
// An alternative would be to use the "local strategy" option with Passport.

// check currently-authenticated user, i.e. "who am I?"
router.get('/me', (req, res, next) => {
    res.json(req.user);
  });

// login, i.e. "you remember `me`, right?"
router.put('/login', (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) res.status(401).send('User not found');
        else if (!user.hasMatchingPassword(req.body.password) res.status(401).send('Incorrect password');
        else {
          req.login(user, err => {
            if (err) next(err);
            else res.json(user);
          });
        }
      })
      .catch(next);
  });

  //Similarly, write a sign up route that will create a user. 
  //Once the user is created, it should be set as the user on the session.
  router.post('/signup', (req, res, next) => {
    User.create(req.body)
      .then(user => {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      })
      .catch(next);
  });

  // logout, i.e. "please just forget `me`"
  router.delete('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy()
    res.sendStatus(204);
  });

  router.get('/me', (req, res, next) => {
    res.json(req.user);
  });


  module.exports = router;