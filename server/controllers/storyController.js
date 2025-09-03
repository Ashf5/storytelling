
import { getStoriesDB } from "../models/storyModel.js";


// Note: This function is supposed to be protected by the auth middleware, so there isn't any jwt check.
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