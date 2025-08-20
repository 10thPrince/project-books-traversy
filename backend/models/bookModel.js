import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "Please Fill in the Book Title!"]
    },
    author: {
        type: String,
        required: [true, "Please Fill in the book Author!"]
    },
    publishYear: {
        type: Number,
        required: [true, "Please fill in the Publish Year!"]
    }
}, {
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema);

export default Book;