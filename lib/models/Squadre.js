var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Squadre = new Schema({
    id: Number,
    name: String,
    v: Number,
    p: Number,
    s: Number
});

module.exports = mongoose.model('Squadre', Squadre);