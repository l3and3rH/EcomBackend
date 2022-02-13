import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {user_store_routes} from './handlers/userHandlers';
import {product_store_routes} from './handlers/productHandlers';
import {order_store_routes} from './handlers/orderHandlers';

export const app: express.Application = express()
const port: number = 3000

app.use(bodyParser.json())

user_store_routes(app);
product_store_routes(app);
order_store_routes(app);

app.listen(port, function () {
    console.log(`Running on portt ${port}`)
});
