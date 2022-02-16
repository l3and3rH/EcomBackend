import express, {Request, Response} from 'express';
import {OrderStore} from '../models/order';
import { authorize } from '../middleware/authorize';

const store= new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400)
    res.json(error)
  }

}

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await store.showByUser(req.params.userId);
    res.json(order);
  } catch (error) {
    res.status(400)
    res.json(error)
  }  

}

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await store.createOrder(req.body.user_id, req.body.order_status);
    res.json(order);
  } catch (error) {
    res.status(400)
    res.json(error)
  } 

}

const addProduct = async (_req: Request, res: Response): Promise<void> => {
  const order_id: string = _req.params.id
  const product_id: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity) 
  try {
    const newProduct = await store.addProduct(order_id, product_id, quantity)
    res.json(newProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
} 



export const order_store_routes =  (app: express.Application): void => {
    app.get( '/orders',authorize, index);
    app.post( '/orders', authorize, create);
    app.get( '/orders/:userId', authorize, show);
    app.post('/orders/:id/products', addProduct)
}