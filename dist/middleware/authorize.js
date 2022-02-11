"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authorize = async (req, res, next) => {
    try {
        const authorizationHeader = String(req.headers.authorization);
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, String(process.env.TOKEN_SECRET));
        next();
    }
    catch (error) {
        res.sendStatus(401);
        return;
    }
};
exports.authorize = authorize;
