
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

export async function createStoryDB(title, content, author_id) {
    const data = await db('stories').insert({'title':title, 'content': content, 'author_id': author_id},["title"]);
    return data;
}


// This function deletes a story, it only deletes if authorId is the author of the book, if it doesn't delete anything it throws an error
export async function deleteStoryDB(storyId, authorId) {
    const storyDeleted = await db('stories').where({'id' : storyId, 'author_id': authorId}).del(['title']);
    // Check if wasn't found, if not check if it's the right author. Throw an error
    if (storyDeleted.length === 0) {
        // check if author and book exist, see why failed
        const author = await db('stories').select('author_id').where({'id': storyId}).first();
        if (!author) {
            const err = new Error('Story not found');
            err.code = 404;
            throw err;
        }
        const err = new Error('Incorrect author, not authorized');
        err.code = 403;
        throw err;
    }
    return storyDeleted;
}


// takes a story id and returns the author id or undefined if story not found
export async function getAuthorIdDB(storyId) {
    let authorId = await db('stories').first(['author_id']).where({'id': storyId});
    return authorId?.author_id;
}


// updates the story, takes a story id and objects with fields to update. Automatically set the updated_at field to now.
export async function updateStoryDB(storyId, updatedObj) {
    const updated = await db('stories').where({'id':storyId}).update({...updatedObj, 'updated_at': db.fn.now()}, ['updated_at']);
    return updated;
}