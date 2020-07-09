// This file primarily deals with modifying the contents of the book list 
const lib = require('./BookObject.js');

var book_list = [];
var book_title = '';
var book_author = '';

function separate_title_author (args) {
    let author_flag = false; // reduces the scope to just this function
    args.forEach(element => {
        if (element != 'by' && !author_flag) {
            book_title += element;
        } else if (element === 'by') {
            author_flag = true;
        } else if (element != 'by' && author_flag) {
            book_author += element;
            author_flag = false;
        }
    });
    
    // console.log(book_title);
    // console.log(book_author);
}

function is_valid_args(args) {
    if (!args.length) { // if the user didn't provide any other arguments after the command
        message.channel.send(`You didn't provide any arguments! Type !commands for command descriptions.`);
        return false;
    } else if (args[0] === ``) {
        message.channel.send(`You didn't provide a book title! Type !commands for command descriptions.`);
        return false;
    } else {
        return true;
    }
}

// checks if book already exists in the list
function book_exists () {
    for (const book of book_list) {
        if (book.bookTitle === book_title && book.bookAuthor === book_author) {
            return true;
        }
    }
    return false;
}


var self = module.exports = {
	name: 'book-list-commands',
    description: 'executes commands that modify the book list',

    add_book: function (message, args) {
        if(is_valid_args(args)) {
            separate_title_author(args);
            if (book_exists()) {
                message.channel.send('This book is already in your list!');
            } else {
                book_list.unshift(new lib.Book(book_title, book_author)); // adds the new book to the beginning
                message.channel.send(`Book added: ${book_title} by ${book_author}`);
            }
            book_title = ''; book_author = ''; // resetting the variables
        }
    }, 

    in_progress: function (message, args) {
        if (is_valid_args(args)) {
            separate_title_author(args);
            if(!book_exists()) {
                message.channel.send('This book isn\'t in your list yet.');
            } else {
                
                message.channel.send(`${book_title} marked as in progress`);
            }
            
        } 
    }, 

    mark_complete: function (message, args) {
        message.channel.send('here, supposed to be marking a book complete');
        message.channel.send(`${book_title} marked as complete`)
    }, 

    delete_book: function (message, args) {
        message.channel.send('here, yeeting a book off the book list');
        message.channel.send(`${book_title} removed from the book list`);
    },

    get_book_list: function() {
        return book_list;
    },

	execute(message, args) {
		message.channel.send('shloop');
	}
};