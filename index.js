const app = require('./lib/app.js');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000; //Apro applicazione in porta 8000
console.log("Server started on port: " + PORT);
app.listen(PORT);


//---------------- CONNESSIONE ----------------
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

(async () => {
  try {
    var dbName = process.env.DB_URL;
    const db = mongoose.connect(dbName, options);
    mongoose.Promise = global.Promise; //abilito le promises
  } catch (error) {
    console.log("Error on connecting to the DB" + error);
    return;
  }
  //listen for error events on the connection (no disconnected)
  mongoose.connection.on('error', error => {
    console.log("Error DB: " + error);
  });

  mongoose.connection.on('connecting', function () {
    console.log("Connecting to " + dbName);
  });

  mongoose.connection.on('connected', function () {
    console.log("Connected to " + dbName);
  });

  mongoose.connection.on('disconnected', function () {
    console.log("Disconnected from " + dbName);
  });

  mongoose.connection.on('error', err => {
    console.error(`Error while connecting to DB: ${err.message}`);
  });

  mongoose.connection.once('open', () => {
    console.log('DB connected successfully!');
  });
})();
//---------------- CONNESSIONE ----------------
