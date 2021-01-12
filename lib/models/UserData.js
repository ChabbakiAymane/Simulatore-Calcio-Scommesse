var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserData = new Schema({
    id: Number,
    username: String,
    mail: String,
    password: String,
    punti: Number,
    puntiSettimanali: Number
});

module.exports = mongoose.model('UserData', UserData);