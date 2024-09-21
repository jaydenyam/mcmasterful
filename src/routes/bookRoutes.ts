import Router from 'koa-router';
import { getAllBooks, filterBooks, addBook } from '../controllers/bookController';

const router = new Router();

router.get('/books', getAllBooks);       // Get all books
router.post('/books/filter', filterBooks); // Filter books by price
router.post('/books', addBook);          // Add a new book

export default router;