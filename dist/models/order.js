"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const Database_1 = __importDefault(require("../Database"));
class OrderStore {
    async index() {
        try {
            const connect = await Database_1.default.connect();
            const query = 'SELECT * FROM orders';
            const result = await connect.query(query);
            connect.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`);
        }
    }
    // get all orders from one user
    async showByUser(user_id) {
        try {
            const connect = await Database_1.default.connect();
            const query = 'SELECT * FROM orders WHERE user_id = ($1)';
            const result = await connect.query(query, [user_id]);
            connect.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`);
        }
    }
    //This would be called to get an OrderID before adding a product to an order
    async createOrder(user_id, order_status) {
        try {
            const connect = await Database_1.default.connect();
            const query = 'INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *';
            const result = await connect.query(query, [user_id, order_status]);
            connect.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`);
        }
    }
    //to fill up the empty order created before you will call addProduct
    async addProduct(order_id, product_id, quantity) {
        try {
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const conn = await Database_1.default.connect();
            const result = await conn
                .query(sql, [order_id, product_id, quantity]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
