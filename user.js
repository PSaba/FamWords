var mongoose = require('mongoose');

var schema = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: false, required: true},
    cards: {type: Array}
})

module.exports = mongoose.model('users', schema);