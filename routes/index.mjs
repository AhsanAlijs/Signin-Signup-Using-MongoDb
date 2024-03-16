import express from 'express'
import ads from './ads.mjs'
import users from './register.mjs'
const router = express.Router()

router.use('/ads', ads)
router.use('/users', users)




export default router