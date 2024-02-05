import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var cache = require('memory-cache'); // Initialize local cache for data storage

// Create the base tables into cache
function build() {
    cache.put('items', `[]`);
};

// Get items from the cache with optional filters
function getItems(filter = {}) {
    let items = JSON.parse(cache.get('items'));

    // Filter items based on the criteria provided in the filter object
    if (filter) {
        items = items.filter(item => {
            // Check title, if filter title is provided and doesn't match, exclude the item
            if (filter.title && item.title && !item.title.toLowerCase().includes(filter.title.toLowerCase())) {
                return false;
            }
            // Check author, if filter author is provided and doesn't match, exclude the item
            if (filter.author && item.author && !item.author.toLowerCase().includes(filter.author.toLowerCase())) {
                return false;
            }
            // Check price, if filter price is provided and doesn't match, exclude the item
            if (filter.price && item.price && item.price !== filter.price) {
                return false;
            }
            // Check stock quantity, if filter stockQuantity is provided and doesn't match, exclude the item
            if (filter.stockQuantity && item.stockQuantity && item.stockQuantity < filter.stockQuantity) {
                return false;
            }
            return true; // Include the item if all relevant filters match
        });
    }

    return { data: items };
}

// Add a new item to the cache
function addItem(item) {
    const items = JSON.parse(cache.get('items'));
    items.push(item);
    cache.put('items', JSON.stringify(items));
}

// Update an existing item in the cache
function updateItem(updatedItem, index) {
    const items = JSON.parse(cache.get('items'));
    if (index >= 0 && index < items.length) {
        items[index] = updatedItem;
        cache.put('items', JSON.stringify(items));
    } else {
        throw new Error('Item not found');
    }
}

// Delete an item from the cache
function deleteItem(index) {
    const items = JSON.parse(cache.get('items'));
    if (index >= 0 && index < items.length) {
        items.splice(index, 1);
        cache.put('items', JSON.stringify(items));
    } else {
        throw new Error('Item not found');
    }
}

// Initial setup
build();

// Export the CRUD functions
export { getItems, addItem, updateItem, deleteItem };