// This file primarily deals with modifying the contents of the book list 
const lib = require('./BookObject.js');
const fetch = require('node-fetch');
const Discord = require('discord.js');

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

function find_book () {
    for (i = 0; i < book_list.length; i++){
        if (book_list[i].bookTitle === book_title && book_list[i].bookAuthor === book_author) {
            return i;
        }
    }
    
    return -1; // indicates that the book couldn't be found
}

function buildNewBookEmbed(book, message) {
    console.log(book)
    var url = book.volumeInfo.imageLinks.thumbnail;
    var embed = new Discord.MessageEmbed()
        .setColor('#ffb7b2')
        .setTitle(book.volumeInfo.title)
        .setURL(`https://www.google.com/books/edition/${encodeURIComponent(book.volumeInfo.title)}/${book.id}`)
        .setDescription(book.volumeInfo.description)
        .setImage(url)
        .addFields(
            {name: "Author", value: book.volumeInfo.authors, inline: true}, 
            {name: "Categories/Genres", value: book.volumeInfo.categories[0], inline: true}, 
            {name: "Number of Pages", value: book.volumeInfo.pageCount, inline: true}
        )
        .setTimestamp();
    message.channel.send(embed)
    return embed;
}

async function searchNewBook(message, search, api_key) {
    var initialData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&key=${api_key}`).then(response => response.json()); // : await fetch
    // if(!initialData || initialData.totalItems == 0 || initialData.items.length == 0) {
    //     return false;
    // }
    var bookEmbed = buildNewBookEmbed(initialData.items[0], message);
    return bookEmbed;

    // console.log(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&key=${api_key}`);
}

var self = module.exports = {
	name: 'book-list-commands',
    description: 'executes commands that modify the book list',

    search_book: function(message, args, api_key){
        console.log(args)
        // message.channel.send(`args: ${args}`);
        var embed = searchNewBook(message, args, api_key);
        // console.log('herehere')
        // message.channel.send(embed);
        
        
    },

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
                book_index = find_book()
                if(book_index >= 0) {
                    book_list[book_index].markInProgress()
                    message.channel.send(`${book_title} marked as in progress`);
                } else {
                    message.channel.send(`${book_title} wasn't found.`);
                }
            }

            book_title = ''; book_author = ''; // resetting the variables
        } 
    }, 

    mark_complete: function (message, args) {
        if (is_valid_args(args)) {
            separate_title_author(args);
            if(!book_exists()) {
                message.channel.send('This book isn\'t in your list yet.');
            } else {
                book_index = find_book()
                if(book_index >= 0) {
                    book_list[book_index].markComplete()
                    book_list.push(book_list.splice(book_index, 1)[0]);
                    message.channel.send(`${book_title} marked complete`);
                } else {
                    message.channel.send(`${book_title} wasn't found.`);
                }
            }
            
            book_title = ''; book_author = ''; // resetting the variables
        } 
    }, 

    delete_book: function (message, args) {
        if (is_valid_args(args)) {
            separate_title_author(args);
            if(!book_exists()) {
                message.channel.send('This book isn\'t in your list yet.');
            } else {
                book_index = find_book()
                if(book_index >= 0) {
                    book_list.splice(book_index, 1)
                    message.channel.send(`${book_title} has been deleted`);
                } else {
                    message.channel.send(`${book_title} wasn't found.`);
                }
            }
            
            book_title = ''; book_author = ''; // resetting the variables
        } 
    },

    get_book_list: function() {
        return book_list;
    },

	execute(message, args) {
		message.channel.send('shloop');
	}
};