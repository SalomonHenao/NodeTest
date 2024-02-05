import express from "express";
import bodyParser from "body-parser";
import { get, post, put, del } from "./utils/api.js"; // Import CRUD functions from API

const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to get all items
app.get('/', (req, res) => {
    // This will include any query params as filters (e.g., title, author)
    const result = get(req.query);
    res.json(result);
});


// Route to add a new item
app.post('/', (req, res) => {
    const data = req.body;
    const result = post(data);
    res.json(result);
});

// Route to update an item
app.put('/:index', (req, res) => {
    const { index } = req.params;
    const data = req.body;
    const result = put(Number(index), data);
    res.json(result);
});

// Route to delete an item
app.delete('/:index', (req, res) => {
    const { index } = req.params;
    const result = del(Number(index));
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
