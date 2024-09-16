"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("@koa/cors"));
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use((0, cors_1.default)());
app.use((0, koa_bodyparser_1.default)());
// Load book data
const booksFilePath = './mcmasterful-book-list.json';
let books = [];
// fs.readdirSync(".").forEach(file => console.log(file));
try {
    const data = fs_1.default.readFileSync(booksFilePath, 'utf8');
    books = JSON.parse(data);
    console.log('Books loaded:', books); // Debug log to confirm books are loaded
}
catch (err) {
    console.error('Error reading book list file:', err);
}
// Route to get all books
router.get('/books', (ctx) => {
    console.log('GET /books route hit'); // Debug log to confirm route is hit
    ctx.body = books;
});
// Route to filter books by price range
router.post('/books/filter', (ctx) => {
    console.log('GET /books/filter route hit'); // Debug log to confirm route is hit
    let returnBooks = [];
    const body = ctx.request.body;
    for (let i = 0; i < body.length; i++) {
        let minPrice = body[i].from ? body[i].from : 0;
        let maxPrice = body[i].to ? body[i].to : Number.MAX_SAFE_INTEGER;
        const filteredBooks = books.filter(book => book.price >= minPrice && book.price <= maxPrice);
        returnBooks = returnBooks.concat(filteredBooks);
    }
    console.log(`Filtered books: ${JSON.stringify(returnBooks)}`); // Debug log to confirm filtering
    ctx.body = returnBooks;
});
// Route to add a new book
router.post('/books', (ctx) => {
    console.log('POST /books route hit'); // Debug log to confirm route is hit
    const newBook = ctx.request.body; // Assert the type of newBook
    books.push(newBook);
    ctx.body = { message: 'Book added successfully' };
});
// Ensure the routes are registered
app.use(router.routes()).use(router.allowedMethods());
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
