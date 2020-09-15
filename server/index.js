const app = require('./app');
const db = require('./db/db.js');


//lets listen for requests!!
const port = process.env.PORT || 5000;
const server = app.listen(port, (error) => {
    if(error) throw error;
    console.log(`Listening to port ${port}`)
    db.sync()
        .then(() => {
            console.log('\nPostgress server is connected as well\n')
        })
});

module.exports = server


// const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
// app.listen(port, function () {
//   console.log("Knock, knock");
//   console.log("Who's there?");
//   console.log(`Your server, listening on port ${port}`);
// });