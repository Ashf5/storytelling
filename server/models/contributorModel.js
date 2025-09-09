
import db from "../db/db.js";

// This function assumes that it's only used by a verified author.
export async function addContributorDB(storyId, userId) {
    const id = await db('contributors').insert({'story_id': storyId, 'user_id': userId}, ['id']);
    return id;
}


export async function getContributorsDB(storyId) {
    const contributors = await db('contributors').join('users', 'contributors.user_id', '=', 'users.id').select(['users.username', 'users.email', 'contributors.id']).where({'contributors.story_id': storyId});
    return contributors;
}


export async function deleteContributorDB(id) {
    await db('contributors').where({'id': id}).del();
}

// Takes a contributor id and returns the author id for that story
export async function getAuthorIdFromContributor(contributorId) {
    const authorId = await db('contributors').join('stories', 'contributors.story_id', '=', 'stories.id').select('stories.author_id').where({'contributors.id': contributorId});
    return authorId[0]?.author_id;
}


// returns either userId or undefined if not a collaborator or author
export async function isCollaboratorDB(storyId, userId) {
    let user = await db('contributors').where({'story_id': storyId, 'user_id': userId}).first('id');

    // if not collaborator check if author.
    if (!user) {
        let author = await db('stories').where({'id': storyId}).first('author_id');
        if (!author) {
            let err = new Error();
            err.code = 404;
            throw err;
        }
        if (author.author_id === userId) user = author.author_id;
    }
    return user;
}
