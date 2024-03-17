import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Schema } = mongoose

const usersSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        default: [],
        type: []
    }
})

// Make Password Hash Start

usersSchema.pre('save', function (next) {
    const user = this

    if (user.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);

        user.password = hash



    }
    next()
})
// Make Password Hash End

// Compare password Start
usersSchema.methods.comparePassword = function (password) {
    const user = this
    return bcrypt.compareSync(password, user.password)
}
// Compare password End

// Generate Token Start

usersSchema.methods.generateToken = function () {
    const { _id } = this
    const token = jwt.sign({ _id }, process.env.JWT_SECRET);
    return token
}
// Generate Token End












const User = mongoose.model('users', usersSchema)

export default User