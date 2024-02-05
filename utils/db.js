import { Book } from '../models/data.js' // Import the Book class
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var cache = require('memory-cache'); // Initialize local cache for data storage

// Create the base tables into cache
function build() {
    cache.put('books', JSON.stringify([]));
}

// Get books from the cache with optional filters
function getBooks(filter = {}) {
    let books = JSON.parse(cache.get('books')).map(bookData => new Book(bookData.id, bookData.title, bookData.description, bookData.author, bookData.price, bookData.quantity));

    // Filter books based on the criteria provided in the filter object
    if (filter) {
        // Check filters, if filter is provided and doesn't match, exclude the book
        books = books.filter(book => {
            if (filter.title && book.title && !book.title.toLowerCase().includes(filter.title.toLowerCase())) {
                return false;
            }
            if (filter.author && book.author && !book.author.toLowerCase().includes(filter.author.toLowerCase())) {
                return false;
            }
            if (filter.price && book.price && book.price !== filter.price) {
                return false;
            }
            if (filter.quantity && book.quantity && book.quantity < filter.quantity) {
                return false;
            }
            return true; // Include the book if no filter-out criteria matched
        });
    }

    return { data: books };
}

// Add a new book to the cache
function addBook(book) {
    // Ensure the book being added is an instance of Book
    if (!(book instanceof Book)) {
        throw new Error('The provided object is not an instance of Book');
    }
    const books = JSON.parse(cache.get('books'));
    books.push(book);
    cache.put('books', JSON.stringify(books));
}

// Update an existing book in the cache
function updateBook(updatedBookData, bookId) {
    const books = JSON.parse(cache.get('books'));
    const bookIndex = books.findIndex(book => book.id.toString() === bookId.toString());
    if (bookIndex !== -1) {
        // Found the book, now update it
        books[bookIndex].title = updatedBookData.title;
        books[bookIndex].description = updatedBookData.description;
        books[bookIndex].author = updatedBookData.author;
        books[bookIndex].price = updatedBookData.price;
        books[bookIndex].quantity = updatedBookData.quantity;

        cache.put('books', JSON.stringify(books));
    } else {
        throw new Error('Book not found');
    }
}

// Delete a book from the cache
function deleteBook(bookId) {
    const books = JSON.parse(cache.get('books'));
    const bookIndex = books.findIndex(book => book.id.toString() === bookId.toString());
    if (bookIndex !== -1) {
        // Found the book, now delete it
        books.splice(bookIndex, 1);
        cache.put('books', JSON.stringify(books));
    } else {
        throw new Error('Book not found');
    }
}


// Initial setup
build();

// Export the CRUD functions
export { getBooks, addBook, updateBook, deleteBook };
