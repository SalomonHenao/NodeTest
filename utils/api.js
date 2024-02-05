import { getBooks, addBook, updateBook, deleteBook } from "./db.js"; // Import CRUD functions from DB
import { Book } from '../resources/data.js' // Import Book object class
import { BASE_STRINGS } from "../resources/text.js"; // Import user strings base

// Get all books
function get(query) {
    // Extract filter parameters
    const filter = {
        title: query.title,
        description: query.description,
        author: query.author,
        price: query.price ? parseFloat(query.price) : undefined,
        quantity: query.quantity ? parseInt(query.quantity, 10) : undefined
    };

    // Remove undefined filters
    Object.keys(filter).forEach(key => filter[key] === undefined && delete filter[key]);

    // Call getBooks with constructed filter
    const result = getBooks(filter);
    return result;
}

// Random ID generation
function generateUniqueId() {
    return Date.now().toString();
}

// Add a new book
function post(data) {
    try {
        if (!data.title || !data.description || !data.author || !data.price || !data.quantity) {
            return BASE_STRINGS.notBook;
        }
        // Create a new Book instance from the request data
        const newBook = new Book(generateUniqueId(), data.title, data.description, data.author, parseFloat(data.price), parseInt(data.quantity));
        addBook(newBook); // Pass the Book instance to addBook
        return { success: true, message: BASE_STRINGS.postBook };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Update an existing book
function put(bookId, data) {
    try {
        if (!data.title || !data.description || !data.author || !data.price || !data.quantity) {
            return BASE_STRINGS.notBook;
        }
        // Since we're updating, we don't create a new instance but prepare data for update
        const updatedBookData = {
            title: data.title,
            description: data.description,
            author: data.author,
            price: data.price,
            quantity: data.quantity
        };

        updateBook(updatedBookData, bookId); // Pass the updated data and ID to updateBook
        return { success: true, message: BASE_STRINGS.putBook };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Delete an book
function del(index) {
    try {
        // Pass the ID to deleteBook
        deleteBook(index);
        return { success: true, message: BASE_STRINGS.delBook };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Export API CRUD functions
export { get, post, put, del };
