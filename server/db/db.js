
//You use this to create an instance of sequelize, which is what creates the connection to your database (this is why it's sometimes stored in a variable called 'db' - it represents your database). You will also use this instance to do things like define your models. This is why it's often a good idea for the instance of sequelize to be created in its own module.
//this way sets you up for heroku deployment, because of the environment variable.
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/exercises', {
  logging: false // unless you like the logs
  // ...and there are many other options you may want to play with
});

module.exports = db;




// const Sequelize = require('sequelize');

// const db = new Sequelize('postgres://localhost:5432/yourdbname', {
//   logging: false // unless you like the logs
//   // ...and there are many other options you may want to play with
// });

// module.exports = db;

