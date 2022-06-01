const mongoose = require('mongoose');

const StoreModel = require('./Store.model');
const FruitModel = require('./Fruit.model');

const InventoryModel = new mongoose.Schema({
    stock: {
        type: Number,
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: StoreModel
    },
    fruit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: FruitModel
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

module.exports = mongoose.model('inventory', InventoryModel);

