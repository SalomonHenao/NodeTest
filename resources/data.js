class Book {
    constructor(id = null, title, description, author, price, quantity) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.price = price;
        this.quantity = quantity;
    }
}

export { Book };