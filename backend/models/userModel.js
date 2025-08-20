import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Fill In a Name"]
    },
    email:{
        type: String,
        required: [true, "Please Fill In an Email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please Fill In a Password"]
    }
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User;