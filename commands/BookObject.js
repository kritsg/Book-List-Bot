function Book(title, author) {
    this.bookTitle = title;
    this.bookAuthor = author;
    this.status = "unread"; // default status is unread
    this.markInProgress = function() {this.status = "in_progress";}; // changes status to in progress if user started reading book
    this.markComplete = function() {this.status = "complete";}; // changes status to complete is user is done reading book
}

module.exports = {
    Book
}