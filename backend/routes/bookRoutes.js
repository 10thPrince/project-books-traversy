import express from "express";
import {
    getBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/bookController.js'
import { protect } from "../middleware/authMiddleware.js";



const router = express.Router();

router.get('/', protect, getBooks);
router.get('/:id', protect, getOneBook);
router.post('/', protect, createBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

export default router