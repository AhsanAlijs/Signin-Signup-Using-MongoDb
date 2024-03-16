import mongoose from "mongoose";
const { Schema } = mongoose;

const adsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Adds = mongoose.model('adds',adsSchema)

export default Adds