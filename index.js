require('dotenv').config();

// Dependencies

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const {INVENTORY} = require('./__mock__/stock.mock');
const inventoryController = require('./controllers/Inventory.controller');
const userController = require('./controllers/User.controller');
const {verify} = require('./middlewares/auth.middleware');

// Config

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if (process.env.ENV === 'PRODUCTION') {
    app.use(helmet());
}

require('./controllers/database.controller');

// Endpoints

const fruitRouter = express.Router();

fruitRouter.get('/stock', async (request, response) => {
    const stock = await inventoryController.getAllStock();
    if (stock.error) {
        response.status(500).json(stock.error);
    } else {
        response.json(stock);
    }
});

fruitRouter.post('/transfer/:id', verify, async (request, response) => {
    const {from, to, quantity} = request.body;
    const {id} = request.params;
    const data = await inventoryController.transfer(id, from, to, quantity);
    if(data.error) {
        response.status(500).json(data.error);
    } else {
        response.json(data);
    }
});

app.use('/fruit', fruitRouter);

app.post('/login', async (request, response) => {
    const {username, password} = request.body;
    const data = await userController.login(username, password);

    if (data.error) {
        response.status(500).json(data.error.message);
    } else {
        response.json(data);
    }
});

// Server API REST

app.listen(3004, () => {
    console.log('Something amazing is running on http://localhost:3004');
})