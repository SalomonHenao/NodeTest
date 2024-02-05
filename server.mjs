import express from "express"; // Import express to run server
import bodyParser from "body-parser"; // Import middleware
import { get, post, put, del } from "./utils/api.js"; // Import CRUD functions from API
import { BASE_STRINGS } from "./resources/text.js"; // Import user strings base

const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to get all books
app.get('/api/books', (req, res) => {
    // Include any query params as filters (title, author, etc.)
    const result = get(req.query);
    res.json(result);
});

// Route to add a new book
app.post('/api/books', (req, res) => {
    const data = req.body;
    const result = post(data);
    res.json(result);
});

// Route to update an book
app.put('/api/books/:index', (req, res) => {
    const { index } = req.params;
    const data = req.body;
    const result = put(Number(index), data);
    res.json(result);
});

// Route to delete an book
app.delete('/api/books/:index', (req, res) => {
    const { index } = req.params;
    const result = del(Number(index));
    res.json(result);
});

// Start listening
app.listen(port, () => {
    console.log(`${BASE_STRINGS.running} ${port}`);
});
