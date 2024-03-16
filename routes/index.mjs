import express from 'express'
import ads from './ads.mjs'
const router = express.Router()

router.use('/ads', ads)




export default router