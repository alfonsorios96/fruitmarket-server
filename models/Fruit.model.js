const mongoose = require('mongoose');

const FruitModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('fruit', FruitModel);
