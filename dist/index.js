"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userHandlers_1 = require("./handlers/userHandlers");
const productHandlers_1 = require("./handlers/productHandlers");
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
(0, userHandlers_1.user_store_routes)(app);
(0, productHandlers_1.product_store_routes)(app);
app.listen(port, function () {
    console.log(`Running on portt ${port}`);
});
