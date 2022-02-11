"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product_store_routes = void 0;
const product_1 = require("../models/product");
const authorize_1 = require("../middleware/authorize");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    const product = await store.create(req.body.name, req.body.price, req.body.category);
    res.json(product);
};
const product_store_routes = (app) => {
    app.get('/products', index);
    app.post('/products', authorize_1.authorize, create);
    app.get('/products/:id', show);
};
exports.product_store_routes = product_store_routes;
