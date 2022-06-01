require('dotenv').config();

// Dependencies

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const {INVENTORY} = require('./__mock__/stock.mock');
const inventoryController = require('./controllers/Inventory.controller');

// Config

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if (process.env.ENV === 'PRODUCTION') {
    app.use(helmet());
}

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

fruitRouter.post('/transfer', (request, response) => {
    const {from, to, quantity} = request.body;
    response.json(INVENTORY);
});

app.use('/fruit', fruitRouter);

// Server API REST

app.listen(3004, () => {
    console.log('Something amazing is running on http://localhost:3004');
})