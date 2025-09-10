
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { getPasswordAndIdDB, registerDB } from "../models/authModel.js";

dotenv.config();
const jsonSecret =  process.env.JSON_SECRET;


// accepts post request to create new user
export async function register(req, res) {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({msg: 'missing mandatory json body'});
    }

    const password_hash = await bcrypt.hash(password, 10);

    try {
        let user = await registerDB(username, email, password_hash);
        if (!user) throw new Error('An error occured');
        console.log(user)
        const {accessToken, refreshToken} = createTokenAndRefresh(email, user.id);
        res.cookie("refreshToken", refreshToken, {httpOnly: true, secure: true});
        return res.status(201).json({msg: 'success', accessToken});
    } 
    catch (e) {
        console.log(e)
        if (e.code === '23505') {
            return res.status(400).json({msg: 'This email is already registered'});
        }
        return res.status(400).json({msg: 'an error occured'})
    }
}


export async function login(req, res) {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({msg: 'missing body paramaters'});
    }

    // Check password 
    const passwordAndId = await getPasswordAndIdDB(email);
    if (!passwordAndId) {
        return res.status(404).json({msg: 'Email not found'});
    }

    const isMatch = await bcrypt.compare(password, passwordAndId.password_hash);

    if (!isMatch) {
        return res.status(401).json({msg: 'Incorrect password'});
    }

    // Generate the tokens 
    const {accessToken, refreshToken} = createTokenAndRefresh(email, passwordAndId.id)


    // Set cookie with refresh token and return the access token
    res.cookie("refreshToken", refreshToken, {httpOnly: true, secure: true});
    res.status(201).json({accessToken});


}

// refresh the token
export async function refresh(req, res) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(403).json({msg: 'no refresh token found'});

    jwt.verify(refreshToken, jsonSecret, (err, user) => {
        if (err) return res.status(403).json({msg: 'invalid refresh token'});

        const accessToken = jwt.sign({email: user.email, userId:user.userId},jsonSecret, {
            expiresIn: "15m"
        });

        return res.status(201).json({accessToken});

    })
}

function createTokenAndRefresh(email, userId) {
    // Generate the tokens 

    const accessToken = jwt.sign({email: email, userId: userId},jsonSecret, {
        expiresIn: "15m"
    });

    const refreshToken = jwt.sign({ email: email, userId: userId},jsonSecret, {
        expiresIn: "7d"
    })
    return {accessToken, refreshToken};
}