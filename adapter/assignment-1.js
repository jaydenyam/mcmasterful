"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
// If you have multiple filters, a book matching any of them is a match.
async function listBooks(filters) {
    console.log(filters);
    if (filters) {
        if (filters.length === 0) {
            const books = await fetch("http://localhost:3000/books");
            //console.log(books.json());
            return books.json();
        }
        else {
            const books = await fetch("http://localhost:3000/books/filter", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(filters),
            });
            return books.json();
        }
    }
    else {
        return new Promise((resolve) => {
            resolve([]);
        });
    }
}
const assignment = "assignment-1";
exports.default = {
    assignment,
    listBooks
};
