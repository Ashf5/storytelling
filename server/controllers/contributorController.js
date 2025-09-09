import { getIdDB } from "../models/authModel.js";
import { addContributorDB, deleteContributorDB, getAuthorIdFromContributor, getContributorsDB } from "../models/contributorModel.js";
import { getAuthorIdDB } from "../models/storyModel.js";


export async function addContributor(req, res) {
    let {email, story_id} = req.body;
    if (!email || !story_id) {
        return res.status(400).json({msg: 'missing mandatory params, email and story_id'});
    }

    const data = await getIdDB(email);
    console.log(collabId);
    const collabId = data[0].id;
    

    let authorId;
    try {
        authorId = await getAuthorIdDB(story_id);
        if (!authorId) {
            let err = new Error('Story not found');
            err.code = 404;
            throw err;
        }
    }
    catch(e) {
        if (e.code === 404) {
            return res.status(404).json({msg: 'story not found'});
        }
        return res.status(500).json({msg: 'something went wrong, try again later'});
    }

    // make sure user is the author

    if (authorId !== req.user.userId) {
        return res.status(403).json({msg: 'Only the author can add contributors'});
    }

    try {
        if (!collabId) {
            let e = new Error()
            e.code = '23503';
            throw e;
        } 
        await addContributorDB(collabId, user_id);
        return res.status(201).json({msg: 'Contributor added'});
    }
    catch(e) {
        console.log(e);
        if (e.code === '23503') {
            return res.status(404).json({msg: "this user doesn't exist"});
        }
        return res.status(500).json({msg: 'An error occured while adding new contributor'});
    }
}


// this function assumes the caller was authenticated with the auth middleware
export async function getContributors(req, res) {
    const storyId = Number(req.params.story_id);
    if (!storyId) {
        return res.status(400).json({msg: 'invalid id provided'});
    }

    try {
        const contributors = await getContributorsDB(storyId);
        return res.status(200).json(contributors);
    }
    catch (e) {
        return res.status(500).json({msg: 'something went wrong while fetching contributors. Try again later'})
    }
}


// delete contributor 
export async function deleteContributor(req, res) {
    let contributorId = Number(req.params.id);
    if (!contributorId) {
        return res.status(400).json({msg: 'invalid id provided'});
    }

    let authorId;
    try {
        authorId = await getAuthorIdFromContributor (contributorId);
        if (!authorId) {
            let err = new Error();
            err.code = 404;
            throw err;
        }
    }
    catch(e) {
        if (e.code === 404) {
            return res.status(404).json({msg: 'Contributor not found'});
        }
        return res.status(500).json({msg: 'something went wrong, try again later'});
    }


    if (authorId !== req.user.userId) {
        return res.status(403).json({msg: 'Only the author can remove contributors'});
    }

    await deleteContributorDB(contributorId);
    return res.status(200).json({msg: 'Contributor removed'});


}