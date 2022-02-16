import express, {Request, Response} from 'express';
import {ProductStore} from '../models/product';
import { authorize } from '../middleware/authorize';

const store= new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (error) {
        res.status(400)
        res.json(error)
    }

}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await store.show(String(req.params.id));
        res.json(product);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
    
        const product = await store.create(req.body.name, req.body.price, req.body.category);
        res.json(product);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}



export const product_store_routes =  (app: express.Application): void => {
    app.get( '/products', index);
    app.post( '/products', authorize, create);
    app.get( '/products/:id', show);
}