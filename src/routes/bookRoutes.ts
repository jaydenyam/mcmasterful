import Router from 'koa-router';
import { BookController } from '../controllers/bookController';

const router = new Router();
const bookController = new BookController();

router.get('/api/books', bookController.getBooks.bind(bookController));

export default router;