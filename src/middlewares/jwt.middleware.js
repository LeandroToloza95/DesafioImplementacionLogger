import jwt from 'jsonwebtoken'
import config from '../config.js'

export const jwtValidation = (req, res, next) => {
    try {

        //const authHeader = req.get('Authorization');
        const authHeader = req.headers.authorization
        console.log(authHeader);
        if (!authHeader) return res.status(401).send({
            error: "Not authenticated"
        })
        const token = authHeader.split(' ')[1]

        jwt.verify(token, config.jwt_secret, (error, credentials) => {
            if (error) return res.status(403).send({ error: "Not authorized", message: error })
            req.user = credentials
            console.log(credentials);
            next();
        })


    } catch (error) {
        res.status(500).json({ error })
    }
}