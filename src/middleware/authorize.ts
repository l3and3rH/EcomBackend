import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const authorize = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    try {
        const authorizationHeader = String(req.headers.authorization)
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, String(process.env.TOKEN_SECRET))
        next()
    } catch (error) {
        res.sendStatus(401);
        return;
    }
    
}