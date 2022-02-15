import express, {Request, Response} from 'express';
import {UserStore} from '../models/user';
import { authorize } from '../middleware/authorize';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store= new UserStore();

const index = async (req: Request, res: Response): Promise<void> => {
    const users = await store.index();
    res.json(users);
}


const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await store.create(req.body.firstname, req.body.lastname, req.body.password);

        var token = jwt.sign({ user }, String(process.env.TOKEN_SECRET));
        res.json(token);
    } catch (error) {
        res.status(400)
        res.json(error + req.body)
    }
}

const autheticate = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await store.authenticate(req.body.firstname, req.body.lastname, req.body.password);

        var token = jwt.sign({ user }, String(process.env.TOKEN_SECRET));
        res.json(token);
    } catch (error) {
        res.status(400)
        res.json(error + req.body)
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    const user = await store.show(req.params.id);
    res.json(user);
}

export const user_store_routes =  (app: express.Application): void => {
    app.get( '/User', authorize ,index);
    app.post( '/User', create);
    app.post( '/User/Login', autheticate);
    app.get( '/User/:id', authorize ,show);
}
