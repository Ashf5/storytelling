
import { isCollaboratorDB } from "../models/contributorModel.js";
import { getStoriesDB, createStoryDB, deleteStoryDB, updateStoryDB, getAuthoredAndContribDB } from "../models/storyModel.js";


// Note: These functions are supposed to be protected by the auth middleware, so there isn't any jwt check.
// Returns all the stories
export async function getStories(req, res) {
    try {
        const stories = await getStoriesDB();
        res.status(200).json(stories)
    }
    catch(e) {
        return res.status(500).json({msg: 'Error fetching stories. Please try again later'});
    }
    
}

export async function getAuthorsStories(req, res) {
    try {
        // use the decoded user from the json token to get the user id
        const stories = await getStoriesDB(req.user.userId);
        res.status(200).json(stories)
    }
    catch(e) {
        return res.status(500).json({msg: 'Error fetching stories. Please try again later'});
    }
}


// This function should be protected by the auth middleware, and therefore should have a user.userId
export async function createStory(req, res) {
    const {title, content} = req.body;
    if (!title || !content) {
        return res.status(400).json({msg: 'Missing paramaters in body. Needs a title and a content'})
    }

    try {
        const titleCreated = await createStoryDB(title, content, req.user.userId);
        return res.status(201).json({msg: `Created: ${titleCreated[0].title}`})
    }
    catch(e) {
        return res.status(500).json({msg: 'something went wrong creating the new book'});
    }
}


export async function deleteStory(req, res) {
    const storyId = Number(req.params.id);
    if(!storyId) {
        return res.status(400).json({msg: 'invalid id provided'});
    }

    try {
        const deleted = await deleteStoryDB(storyId, req.user.userId);
        return res.status(200).json({msg: `Deleted : ${deleted[0].title}`})
    }catch(e) {
        if (e.code === 404) {
            return res.status(404).json({msg: 'Story not found'});
        }
        else if (e.code === 403) {
            return res.status(403).json({msg: 'Only the author may delete this story'});
        }
        else {
            return res.status(500).json({msg: 'something went wrong while deleting, try again later'})
        }
    }
}


export async function updateStory(req, res) {
    const id = Number(req.params.id);
    if (!id) {
        return res.status(400).json({msg: 'invalid id provided.'})
    }
    // create the object to update, only accept updates to title or content.
    const updatedObj = {};
    const {title, content} = req.body;
    if (!title && !content) {
        return res.status(400).json({msg: 'mandatory: either title or content field to update'});
    }
    if(title) updatedObj['title'] = title;
    if(content) updatedObj['content'] = content;

    // check if author or contributor.
    try {
        let isAuthorizedUpdate = await isCollaboratorDB(id, req.user.userId)
        if (!isAuthorizedUpdate) {
            let err = new Error();
            err.code = 403;
            throw err;
        }
    }
    catch(e) {
        if (e.code === 403) {
            return res.status(403).json({msg: 'You do not have permission to update this story.'})
        }else if (e.code === 404) {
            return res.status(404).json({msg: 'This story doesn\'t exist'})
        }
        return res.status(500).json({msg: 'An error occured while verifying permissions.'})
    }

    try {
        const updated = await updateStoryDB(id, updatedObj);
        if (updated) {
            return res.status(201).json({msg: `Updated at ${updated[0].updated_at}`})
        }
        throw new Error('Something went wrong while updating')
    }
    catch(e) {
        return res.status(500).json({msg: 'an error occured while updating story. Try again later'})
    }
    
}


// gets all id's of stories where given id is author or contributed.
export async function getAuthoredAndContrib(req, res) {
    try {
        console.log(req.user)
        const data = await getAuthoredAndContribDB(req.user.userId);
        return res.status(200).json(data);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json({msg: 'error occured while fetching data on authored stories.'});
    }
}