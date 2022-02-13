"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userHandlers_1 = require("./handlers/userHandlers");
const productHandlers_1 = require("./handlers/productHandlers");
const orderHandlers_1 = require("./handlers/orderHandlers");
exports.app = (0, express_1.default)();
const port = 3000;
exports.app.use(body_parser_1.default.json());
(0, userHandlers_1.user_store_routes)(exports.app);
(0, productHandlers_1.product_store_routes)(exports.app);
(0, orderHandlers_1.order_store_routes)(exports.app);
exports.app.listen(port, function () {
    console.log(`Running on portt ${port}`);
});
