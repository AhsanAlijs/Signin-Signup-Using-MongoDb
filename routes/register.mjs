import express from 'express'
import User from '../models/Users.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send({ data: users })
})

export default router