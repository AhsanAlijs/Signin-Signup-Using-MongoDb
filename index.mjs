import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import router from './routes/index.mjs';
const app = express();
const port = 3000;

app.use(express.json())

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('Data Base Connected');

    } catch (error) {
        console.log(error);
    }

}

connectDB().then(() => {
    app.listen(port)
}).catch((error) => {
    console.log(error);
})



// request Part
app.use('/', router)