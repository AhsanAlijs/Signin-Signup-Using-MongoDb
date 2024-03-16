import mongoose from "mongoose";

const { Schema } = mongoose

const UsersSchema = new Schema({
    fullname: {
        type: String,
        required: true
    }
})