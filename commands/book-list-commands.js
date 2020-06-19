// This file primarily deals with modifying the contents of the book list 
var book_list = {};
// var book_title = '';
// var book_author = '';

var self = module.exports = {
	name: 'book-list-commands',
    description: 'executes commands that modify the book list',

    book_title: '',

    book_author: '',

    book_list: this.book_list,
    
    separate_title_author: function (args) {
        author_flag: false;
        args.forEach(element => {
            if (element != 'by' && !author_flag) {
                book_title += element;
            } else if (element == 'by') {
                author_flag: true;
                continue;
            } else if (element != 'by' && author_flag) {
                book_author += element;
            }
        });
        
        console.log(book_author);
        console.log(book_title);
    },

    add_book: function (message, args) {
        message.channel.send('here, supposed to be adding a book');
        message.channel.send(`Book added: ${args}`);
    }, 

    in_progress: function (message, args) {
        message.channel.send('here, supposed to be marking a book in progress');
        message.channel.send(`${book_title} marked as in progress`);
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