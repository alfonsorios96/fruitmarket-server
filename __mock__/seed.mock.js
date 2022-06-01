require('dotenv').config();

const {MongoClient} = require('mongodb');
const {URI} = require('../controllers/database.controller');

const mongoClient = new MongoClient(URI, {
    useUnifiedTopology: true,
});

(async () => {
    try {
        await mongoClient.connect();
        const instanceDB = mongoClient.db(process.env.DB_NAME);

        await instanceDB.createCollection('users', {});

        await instanceDB.createCollection('fruits', {});

        await instanceDB.createCollection('stores', {});

        await instanceDB.createCollection('inventories', {});

        const users = instanceDB.collection('users');
        await users.insertMany([
            {
                name: 'Alfonso Rios',
                username: 'malforime@gmail.com',
                password: '$2b$10$Y7hMTmtm4OacBbdq3SAp7eJcQU8bgIYiqwfzK0ZUo9txvDP/ryHMC'
            },
            {
                name: 'Develop user',
                username: 'test@fruitmaker.fr',
                password: '$2b$10$Y7hMTmtm4OacBbdq3SAp7eJcQU8bgIYiqwfzK0ZUo9txvDP/ryHMC'
            }
        ], {});

        console.log('[SYSTEM] - Users created');

        const fruits = instanceDB.collection('fruits');
        const fruitsInserted = await fruits.insertMany([
            {
                name: 'orange',
                picture: ''
            },
            {
                name: 'banana',
                picture: ''
            },
            {
                name: 'apple',
                picture: ''
            },
            {
                name: 'strawberry',
                picture: ''
            },
            {
                name: 'cherry',
                picture: ''
            }
        ], {});

        console.log('[SYSTEM] - Fruits created');

        const stores = instanceDB.collection('stores');
        const storesInserted = await stores.insertMany([
            {
                name: 'Marsella'
            },
            {
                name: 'Paris'
            },
            {
                name: 'Dijon'
            },
            {
                name: 'Niza'
            },
            {
                name: 'Lila'
            }
        ], {});

        console.log('[SYSTEM] - Stores created');

        const inventories = instanceDB.collection('inventories');

        for (const key in storesInserted.insertedIds) {
            const store_id = storesInserted.insertedIds[key];
            for (const index in fruitsInserted.insertedIds) {
                const fruit_id = fruitsInserted.insertedIds[index];
                await inventories.insertOne({
                    fruit: fruit_id,
                    store: store_id,
                    stock: Math.floor(Math.random() * (100 - 10 + 1)) + 10
                }, {});
            }
        }
        console.log('[SYSTEM] - Inventories created');
        return;
    } catch (e) {
        // collection already exists
        console.log('DB already exists');
        return;
    }
})();