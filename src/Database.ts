import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    DEV_DB,
    DEV_DB_User,
    DEV_DB_PW,
    DEV_DB_HOST,
} = process.env

console.log( DEV_DB,
    DEV_DB_User,
    DEV_DB_PW,
    DEV_DB_HOST,)

const client = new Pool({
    host: DEV_DB_HOST,
    database: DEV_DB,
    user: DEV_DB_User,
    password: DEV_DB_PW,
    port: 2204
})

export default client;
