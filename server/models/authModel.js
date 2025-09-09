
import db from "../db/db.js";


// inserts a user into the database, doesn't catch any errors, leaves for the controller.
export async function registerDB(username, email, password_hash) {
    let user = await db('users').insert({username, email, password_hash}, ['username', 'email', 'id']);
    return user;
}


export async function getPasswordAndIdDB(email) {
    let passwordId = await db('users').select(['password_hash', 'id']).where({email: email}).first();
    return passwordId
}

export async function getIdDB(email) {
    let id = await db('users').select('id').where({email: email}).first();
    return id;
}