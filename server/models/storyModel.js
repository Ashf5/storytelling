
import db from "../db/db.js";


// returns all stories, if includes authorId then it returns just that authors stories. Doesn't catch errors.
export async function getStoriesDB(authorId=null) {
    let data;
    if (!authorId) {
        data = await db('stories').select();
    }
    else {
        data = await db('stories').select().where({author_id: authorId});
    }
    
    return data;
}