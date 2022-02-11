"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DEV_DB, DEV_DB_User, DEV_DB_PW, DEV_DB_HOST, } = process.env;
const client = new pg_1.Pool({
    host: DEV_DB_HOST,
    database: DEV_DB,
    user: DEV_DB_User,
    password: DEV_DB_PW
});
exports.default = client;
