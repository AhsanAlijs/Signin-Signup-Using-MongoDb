import express from 'express'
import Adds from '../models/Adds.mjs'
const router = express.Router()

router.get('/', async (req, res) => {
    const ads = await Adds.find()
    res.send({ message: 'Orders fetched successfully!', data: ads })
})

router.post('/ads', async (req, res) => {
    await Adds.create(req.body)
    res.send({ message: 'Order Added successfully!' })
})
router.delete('/ads/:id', async (req, res) => {
    try {
        const deletedAdd = await Adds.findByIdAndDelete(req.params.id);
        if (!deletedAdd) {
            return res.status(404).send({ message: "Add not found" });
        }
        res.send({ message: 'Add deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting add' });
    }
});


export default router