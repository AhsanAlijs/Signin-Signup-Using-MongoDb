import express from 'express'
import User from '../models/Users.mjs';
import verifyToken from '../middlewares/verifyToken.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send({ data: users })
})

// register User Start
router.post('/register', async (req, res) => {
    try {
        await User.create(req.body)
        res.send({ message: 'User Register successfully!' })
    } catch (error) {
        res.status(400).send({ message: error.message });

    }
})
// register User End

// Login Uesr Start
router.put('/login', async (req, res) => {
    try {

        const { email, password } = req.body

        // Step 1: Check if Email exist
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).send({
                message: 'Email not Found!'
            })
            return
        }

        // Step 2: Compare Password

        const isCorrectPassword = user.comparePassword(password)

        if (!isCorrectPassword) {
            res.status(404).send({
                message: 'Password is incorrect!'
            })
            return
        }

        const token = user.generateToken()
        user.tokens.push(token)
        await user.save()

        res.send({ message: 'User Logged in Successfully!', token })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})
// Login Uesr End

// Logout User Start

router.put('/logout', verifyToken, async (req, res) => {
    await User.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({ message: 'Logged Out Successfully!' })
})


// Logout User End






export default router