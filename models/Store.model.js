const mongoose = require('mongoose');

const StoreModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

module.exports = mongoose.model('store', StoreModel);

