const passport = require('passport')
const User = require('../db/user')

passport.serializeUser((user, done) => {
    try {
      done(null, user.id);
    } catch (err) {
      done(err);
    }
  });
  
passport.deserializeUser((id, done) => {
User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});



//   Serialize/Deserialize User
// Passport also needs to know how to serialize/deserialize the user.

// Remember that serialization is usually only done once per session (after we invoke req.login, so that passport knows how to remember the user in our session store. Generally, we use the user's id.

// Deserialization runs with every subsequent request that contains a serialized user on the session - passport gets the key that we used to serialize the user, and uses this to re-obtain the user from our database