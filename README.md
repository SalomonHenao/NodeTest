# Books Inventory Management - Backend

This project is a simple Express.js API for managing books. It supports basic CRUD (Create, Read, Update, Delete) operations on a book resource.

![image](https://github.com/SalomonHenao/ReactTest/assets/39999385/da4f5dba-326b-4349-8df8-4b7e40ca49b2)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running this project, you'll need Node.js and npm installed on your system.

### Installing

First, clone the repository to your local machine:
```git clone https://github.com/SalomonHenao/NodeTest.git```

Navigate to the project directory:
```cd NodeTest```

Install the necessary dependencies:
```npm install```

To start the server, run:
```npm run dev```

The server will start on port 8000, and you should see a message indicating it's running successfully.

### API Endpoints
The API supports the following endpoints:

* GET /api/books: Fetch all books with optional filtering by query parameters (title, author, etc.)
* POST /api/books: Add a new book. Requires a JSON body with book details.
* PUT /api/books/:index: Update an existing book at the specified index. Requires a JSON body with updated book details.
* DELETE /api/books/:index: Delete an existing book at the specified index.

### Example Request
Adding a new book:
```
curl -X POST http://localhost:8000/api/books -H 'Content-Type: application/json' -d '{
    "title": "New Book",
    "description": "Description of the new book",
    "author": "Author Name",
    "price": 19.99,
    "quantity": 5
}'
```

### Contributing
Contributions are welcome, and any feedback or suggestions are greatly appreciated. If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.