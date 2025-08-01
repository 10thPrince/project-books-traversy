import Book from "../models/bookModel.js";



//@desc to see only one book
//@route GET  /book/:id
//@access PRIVATE
export const getOneBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);

        if (!book) {
            return res.status(401).json({
                message: 'No book Found Please Provide A VAlid Id'
            })
        }

        res.status(202).json({
            message: 'Successful!',
            data: book
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'System Error!'
        })
    }
}

//@desc to see all books
//@route GET  /book
//@access PRIVATE
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json({
            message: "Successfull",
            count: books.length,
            data: books
        })
    } catch (err) {
        res.status(500).json({
            message: "Syste Error!"
        })
        console.log(err)
    }
}

//@desc creating a new Book
//@route POST  /book
//@access PRIVATE
export const createBook = async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).json({
                message: "Please Fill In All required Fields!!"
            })
        }


        const newBook = {
            title,
            author,
            publishYear
        }

        const book = await Book.create(newBook);

        res.status(201).json({
            message: "Successfully Created!",
            data: book
        })
    } catch (err) {
        res.status(500).json({
            message: "System Error!",
        })
        console.log(err)
    }
}

//@desc Updating A book
//@route PUT  /book/:id
//@access PRIVATE
export const updateBook = async (req, res) => {



    try {

        const { id } = req.params;

        const { title, author, publishYear } = req.body;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(401).json({
                message: 'No Book Found. Invalid ID!!'
            })
        }

        if (!title || !author || !publishYear) {
            return res.status(400).json({
                message: 'Please Fill in all required fields!'
            })
        }

        const newBook = {
            title,
            author,
            publishYear
        }

        const updatedBook = await Book.findByIdAndUpdate(id, newBook);

        res.status(201).json({
            message: "Book Updated successfully!",
            data: updatedBook
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'System Error!'
        })
    }

}

//@desc to delete one book
//@route DELETE  /book/:id
//@access PRIVATE
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(401).json({
                message: 'No Book Found. Invalid ID!!'
            })
        }

        const deleteBook = await Book.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Book Deleted Successfully!',
            deleteBook
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "System Error!"
        })
    }
}