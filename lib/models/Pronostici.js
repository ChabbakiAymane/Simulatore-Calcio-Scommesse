var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pronostici = new Schema({
    id: Number,
    partita: Number,
    idU: Number,
    pronostico: Number
});

module.exports = mongoose.model('pronosticis', Pronostici);