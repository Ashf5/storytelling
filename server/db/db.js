import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

const db = knex({
    client:'pg',
    connection: process.env.DATABASE_URL,
    pool: { 
        min:1,
        max:10
    }
})

export default db;