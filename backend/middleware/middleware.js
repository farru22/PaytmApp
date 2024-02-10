const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');

const authMiddleware = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        res.status(403).json({

        })
    }

    const token = bearer.split(' ')[1]


    try {
        const isVerified = jwt.verify(token, JWT_SECRET)
        console.log(isVerified.userId)
        req.userId = isVerified.userId
        next();

    } catch (e) {
        res.status(403).json({
            error: e
        })
    }
}

module.exports ={ authMiddleware }