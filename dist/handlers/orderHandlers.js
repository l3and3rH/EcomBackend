"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_store_routes = void 0;
const order_1 = require("../models/order");
const authorize_1 = require("../middleware/authorize");
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    const orders = await store.index();
    res.json(orders);
};
const show = async (req, res) => {
    const order = await store.showByUser(req.params.userId);
    res.json(order);
};
const create = async (req, res) => {
    const order = await store.createOrder(req.body.user_id, req.body.order_status);
    res.json(order);
};
const addProduct = async (_req, res) => {
    const order_id = _req.params.id;
    const product_id = _req.body.productId;
    const quantity = parseInt(_req.body.quantity);
    try {
        const newProduct = await store.addProduct(order_id, product_id, quantity);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const order_store_routes = (app) => {
    app.get('/orders', authorize_1.authorize, index);
    app.post('/orders', authorize_1.authorize, create);
    app.get('/orders/:userId', authorize_1.authorize, show);
    app.post('/orders/:id/products', addProduct);
};
exports.order_store_routes = order_store_routes;
