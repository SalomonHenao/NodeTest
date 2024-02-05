import { getItems, addItem, updateItem, deleteItem } from "./db.js"; // Import CRUD functions from DB

// Get all items
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

    // Call getItems with the constructed filter
    const result = getItems(filter);
    return result;
}


// Add a new item
function post(data) {
    try {
        addItem(data);
        return { success: true, message: "Item added successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Update an existing item
function put(index, data) {
    try {
        updateItem(data, index);
        return { success: true, message: "Item updated successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Delete an item
function del(index) {
    try {
        deleteItem(index);
        return { success: true, message: "Item deleted successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Export the API functions
export { get, post, put, del };
