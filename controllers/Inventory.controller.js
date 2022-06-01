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
    },
    transfer: async (fruit, from, to, quantity) => {
        let response = {};

        try {
            const storeFrom = await model_.findOne({
                fruit, store: from
            }).populate(populate);

            if (!storeFrom) {
                return {
                    error: {
                        message: 'The origin store is not valid'
                    }
                };
            }

            const storeTo = await model_.findOne({
                fruit, store: to
            }).populate(populate);

            if (!storeFrom) {
                return {
                    error: {
                        message: 'The target store is not valid'
                    }
                };
            }

            if (storeFrom.stock - quantity < 0) {
                return {
                    error: {
                        message: `The store [${storeFrom.store.name}] has not enough ${storeFrom.fruit.name}s to transfer. Right now left only ${storeFrom.stock} fruits`
                    }
                };
            }

            storeFrom.stock = storeFrom.stock - quantity;
            storeTo.stock = storeTo.stock + quantity;

            await storeFrom.save();
            await storeTo.save();

            response.data = {
                message: `${quantity} ${storeFrom.fruit.name}s were moved from ${storeFrom.store.name} to ${storeTo.store.name}`
            };
        } catch (error) {
            response.error = error;
        }

        return response;
    }
}

module.exports = actions;