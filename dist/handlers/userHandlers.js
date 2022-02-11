"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_store_routes = void 0;
const user_1 = require("../models/user");
const authorize_1 = require("../middleware/authorize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new user_1.UserStore();
const index = async (req, res) => {
    const user = await store.index();
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = await store.create(req.body.firstname, req.body.lastname, req.body.password);
        var token = jsonwebtoken_1.default.sign({ user }, String(process.env.TOKEN_SECRET));
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error + req.body);
    }
};
const autheticate = async (req, res) => {
    try {
        const user = await store.authenticate(req.body.firstname, req.body.lastname, req.body.password);
        var token = jsonwebtoken_1.default.sign({ user }, String(process.env.TOKEN_SECRET));
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error + req.body);
    }
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const user_store_routes = (app) => {
    app.get('/User', authorize_1.authorize, index);
    app.post('/User', create);
    app.post('/User/Login', autheticate);
    app.get('/User/:id', authorize_1.authorize, show);
};
exports.user_store_routes = user_store_routes;
