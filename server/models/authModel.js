
import db from "../db/db.js";


// inserts a user into the database, doesn't catch any errors, leaves for the controller.
export async function registerDB(username, email, password_hash) {
    let user = await db('users').insert({username, email, password_hash}, ['username', 'email']);
    return user;
}


export async function getPasswordDB(email) {
    let password = await db('users').select('password_hash').where({email: email}).first();
    return password
}

