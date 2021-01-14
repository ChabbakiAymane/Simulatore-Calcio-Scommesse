const mongoose = require('mongoose');
const dovenv = require("dotenv").config();

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
    family: 4, // Use IPv4, skip trying IPv6
  };
  
  (async () => {
    try {
      //Recupero nome del Databse dal .env
      var dbURL = process.env.DB_URL;
      var dbName = process.env.DB_NAME;

      //Connessione al database e se a run-time avviene una disconnessione, dopo 5s tenta di nuovo di collegarsi
      var connectWithRetry = function() {
        return mongoose.connect(dbURL, options, function(err) {
          if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
          }
        });
      };
      connectWithRetry();

      //Abilito le promises
      mongoose.Promise = global.Promise; 

      //Controllo gli stati di connessione al Database
      mongoose.connection.on('connecting', function () { console.log("Connecting to " + dbName); });
  
      mongoose.connection.on('connected', function () { console.log("Connected to " + dbName); });
  
      //Ascolto se avviene una disconnesione, se succede cerco di riattivarla
      mongoose.connection.on('disconnected', function () {
        console.log("Disconnected from " + dbName);
        mongoose.connect(dbURL, options);
      });
  
      //Ascolto se avviene una errore, se succede chiudo la connessione
      mongoose.connection.on('error', err => {
        console.error(`Error while connecting to DB: ${err.message}`);
        mongoose.disconnect();
      });
  
      mongoose.connection.once('open', () => { console.log('DB connected successfully!'); });
    } catch (error) {
      console.log("Error on connecting to the DB" + error);
      return;
    }
  })();
  //---------------- CONNESSIONE ----------------