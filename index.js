const app = require('./lib/app.js');
const database = require('./lib/models/database.js');

//Apro applicazione sulla porta 8000
const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});