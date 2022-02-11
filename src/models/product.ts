import client from '../Database'

export type Product = {
    id?: string;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const connect = await client.connect();
            const query = 'SELECT * FROM products';
    
            const result = await connect.query(query);
    
            connect.release()
    
            return result.rows;
            
        } catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`)
        }

    }

    async show(id: string): Promise<Product> {
        try {
            const connect = await client.connect();
            const query = 'SELECT * FROM products WHERE id = ($1)';
    
            const result = await connect.query(query, [id]);
    
            connect.release()
    
            return result.rows[0];
            
        } catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`)
        }

    }
    async create(name: string, price: number, category: string): Promise<Product> {
        try {
            const connect = await client.connect();
            const query = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
    
            const result = await connect.query(query, [name, price, category]);
    
            connect.release()
    
            return result.rows[0];
            
        } catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`)
        }

    }


}