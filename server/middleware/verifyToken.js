import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({msg: 'missing authorization header'});

    jwt.verify(token, process.env.JSON_SECRET, (err, user) => {
        if (err) return res.status(403).json('invalid token')
        req.user = user;
        next();
    })
}