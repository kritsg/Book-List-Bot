function Book(title, author, id, link) {
    this.bookTitle = title;
    this.bookAuthor = author;
    this.id = id;
    this.googleLink = link;
    this.isRead = false; // default status is unread
}

module.exports = {
    Book
}