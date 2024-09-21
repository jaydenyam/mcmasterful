import booksData from '../../mcmasterful-book-list.json';

export interface Book {
    name: string;
    author: string;
    description: string;
    price: number;
    image: string;
}

// If you have multiple filters, a book matching any of them is a match.
async function listBooks(filters?: Array<{ from?: number; to?: number }>): Promise<Book[]> {
    let books: Book[] = booksData;

    if (filters && filters.length > 0) {
        books = books.filter(book => {
            return filters.some(filter => {
                const from = filter.from ?? 0;
                const to = filter.to ?? Number.MAX_VALUE;

                if (isNaN(from) || isNaN(to) || from < 0 || to < 0 || from > to) {
                    throw new Error('Invalid price range provided.');
                }

                return book.price >= from && book.price <= to;
            });
        });
    }

    return books;
}

const assignment = "assignment-1";

export default {
    assignment,
    listBooks
};