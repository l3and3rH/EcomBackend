"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const Database_1 = __importDefault(require("../Database"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
class UserStore {
    async index() {
        try {
            const connect = await Database_1.default.connect();
            const query = 'SELECT * FROM users';
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
            const query = 'SELECT * FROM users WHERE id = ($1)';
            const result = await connect.query(query, [id]);
            connect.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`);
        }
    }
    async create(firstname, lastname, password) {
        try {
            const password_digest = bcrypt_1.default.hashSync(password + process.env.Pepper, Number(process.env.SaltRounds));
            const connect = await Database_1.default.connect();
            const query = 'INSERT INTO users (firstname, lastname, password_digest) VALUES ($1, $2, $3) RETURNING *';
            const result = await connect.query(query, [firstname, lastname, password_digest]);
            connect.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`);
        }
    }
    async authenticate(firstname, lastname, password) {
        const conn = await Database_1.default.connect();
        const sql = 'SELECT password_digest FROM users WHERE firstname=($1) AND lastname=($2)';
        const result = await conn.query(sql, [firstname, lastname]);
        if (result.rows.length) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(password + process.env.Pepper, user.password_digest)) {
                return user;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
