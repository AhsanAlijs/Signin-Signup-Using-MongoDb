import jwt from 'jsonwebtoken'
import User from '../models/Users.mjs'

async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.slice(7)

    if (!token) {
        res.status(401).send({ message: "No Access" })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const tokenExists = await User.findOne({ tokens: token })

        if (!tokenExists) {
            res.status(401).send({ message: "Invalid token!" })
            return
        }

        req.userId = decoded._id
        req.tokenToRemove = token
        next()
    } catch (error) {
        res.status(401).send({
            message: "Invalid token!"
        })

    }
}

export default verifyToken