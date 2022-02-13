import client from '../Database'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();


export type User = {
    id?: string;
    firstname: string;
    lastname: string;
    password_digest: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const connect = await client.connect();
            const query = 'SELECT * FROM users';
    
            const result = await connect.query(query);
    
            connect.release()
    
            return result.rows;
            
        } catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`)
        }

    }

    async show(id: string): Promise<User> {
        try {
            const connect = await client.connect();
            const query = 'SELECT * FROM users WHERE id = ($1)';
    
            const result = await connect.query(query, [id]);
    
            connect.release()
    
            return result.rows[0];
            
        } catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`)
        }

    }
    async create(firstname: string, lastname: string, password: string): Promise<User> {

        try {
            const password_digest = bcrypt.hashSync(password + process.env.Pepper, Number(process.env.SaltRounds))   
            const connect = await client.connect();
            const query = 'INSERT INTO users (firstname, lastname, password_digest) VALUES ($1, $2, $3) RETURNING *';
    
            const result = await connect.query(query, [firstname, lastname, password_digest]);
    
            connect.release()
    
            return result.rows[0];
            
        } catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`)
        }

    }
    async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
        const conn = await client.connect()
        const sql = 'SELECT password_digest FROM users WHERE firstname=($1) AND lastname=($2)'
    
        const result = await conn.query(sql, [firstname, lastname])
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          if (bcrypt.compareSync(password+process.env.Pepper, user.password_digest)) {
            return user
          }
        }
    
        return null}


}