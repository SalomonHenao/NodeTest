import { getBooks, addBook, updateBook, deleteBook } from "./db.js"; // Import CRUD functions from DB
import { Book } from '../models/data.js' // Import the Book class

// Get all books
function get(query) {
    // Extract filter parameters from the query object
    const filter = {
        title: query.title,
        author: query.author,
        price: query.price ? parseFloat(query.price) : undefined,
        stockQuantity: query.stockQuantity ? parseInt(query.stockQuantity, 10) : undefined
    };

    // Remove undefined filters to avoid filtering by them
    Object.keys(filter).forEach(key => filter[key] === undefined && delete filter[key]);

    // Call getBooks with the constructed filter
    const result = getBooks(filter);
    return result;
}

// Add a new book
function post(data) {
    try {
        // Create a new Book instance from the request data
        const newBook = new Book(data.title, data.description, data.author, data.price, data.quantity);
        addBook(newBook); // Pass the Book instance to addBook
        return { success: true, message: "Book added successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Update an existing book
function put(bookId, data) {
    try {
        // Since we're updating, we don't create a new instance but prepare the data for update
        const updatedBookData = {
            id: bookId, // Ensure this ID is passed to identify the book to update
            title: data.title,
            description: data.description,
            author: data.author,
            price: data.price,
            quantity: data.quantity
        };

        updateBook(updatedBookData, bookId); // Pass the updated data and ID to updateBook
        return { success: true, message: "Book updated successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Delete an book
function del(index) {
    try {
        deleteBook(index);
        return { success: true, message: "Book deleted successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Export the API functions
export { get, post, put, del };
