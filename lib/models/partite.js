var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Partite = new Schema({
    idP: Number,
    sq1: Number,
    sq2: Number,
    esito: String,
    date: Date
});

module.exports = mongoose.model('Partite', Partite);