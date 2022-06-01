const model_ = require('../models/Inventory.model');

const FruitModel = require('../models/Fruit.model');
const StoreModel = require('../models/Store.model');

const populate = [
    {
        path: 'fruit',
        model: FruitModel
    },
    {
        path: 'store',
        model: StoreModel
    }];

const actions = {
    getAllStock: async () => {
        let response = {};
        const query = model_
            .find({});

        populate.map((item) => {
            query.populate(item);
        });

        try {
            const stock = await query.exec({strictPopulate: false});
            if (!stock) {
                response = {};
            }
            response.data = stock;
            response.count = stock.length;
        } catch (error) {
            response.error = error;
        }

        return response;
    }
}

module.exports = actions;