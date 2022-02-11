"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const Database_1 = __importDefault(require("../Database"));
class ProductStore {
    async index() {
        try {
            const connect = await Database_1.default.connect();
            const query = 'SELECT * FROM products';
            const result = await connect.query(query);
            connect.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const connect = await Database_1.default.connect();
            const query = 'SELECT * FROM products WHERE id = ($1)';
            const result = await connect.query(query, [id]);
            connect.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`);
        }
    }
    async create(name, price, category) {
        try {
            const connect = await Database_1.default.connect();
            const query = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            const result = await connect.query(query, [name, price, category]);
            connect.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
