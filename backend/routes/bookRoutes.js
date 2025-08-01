import express from "express";
import {
    getBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/bookController.js'




const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getOneBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router