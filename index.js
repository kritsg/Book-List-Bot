
const {prefix, token, api_key, uri} = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose');
const fetch = require('node-fetch');


const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;
const Book = new Schema({
    id: ObjectID,
    primaryKey: {type: String, unique: true},
    guildID: {type: String, index: true},
    bookID: String,
    title: String, 
    author: [Array], 
    description: String,
    categories: [Array],
    pageCount: Number,
    imageURL: String,
    bookURL: String
})

const bookModel = mongoose.model("Book", Book);
var main = {};
client.commands = new Discord.Collection();
client.login(token);

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

function buildNewBookEmbed(book) {
    console.log(book.volumeInfo.authors)
    var url = book.volumeInfo.imageLinks.thumbnail;
    var embed = new Discord.MessageEmbed()
        .setColor('#ffb7b2')
        .setTitle(book.volumeInfo.title)
        .setURL(`https://www.google.com/books/edition/${encodeURIComponent(book.volumeInfo.title)}/${book.id}`)
        .setDescription(((book.volumeInfo.description) ? book.volumeInfo.description : "N/A - Maybe try a Google Link?"))
        .setImage(url)
        .addFields(
            {name: "Author", value: ((book.volumeInfo.authors) ? book.volumeInfo.authors : "N/A"), inline: true}, 
            {name: "Categories/Genres", value: ((book.volumeInfo.categories) ? book.volumeInfo.categories[0] : "N/A"), inline: true}, 
            {name: "Number of Pages", value: ((book.volumeInfo.pageCount) ? book.volumeInfo.pageCount : "N/A") , inline: true}
        )
        .setTimestamp();
    
    return embed;
}

async function searchBook(search, isLink) {
    console.log(search);
    if(!search.trim().length) {
        return "Your search query is empty!";
    } else if(isLink) {
        var id = search.split("/")[6].substring(0, 12);
        var book = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`).then(response => response.json()); // : await fetch
        return book;
    } else {
        var initialData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&key=${api_key}`).then(response => response.json()); // : await fetch
        if(initialData.totalItems > 0) {
            return initialData.items[0];
        } else {
            return "No books found!";
        }
    }
}

main.bookModel = bookModel;
main.buildNewBookEmbed = buildNewBookEmbed;
main.searchBook = searchBook;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
// on --> this can trigger multiple times
client.on('message', message => {
    // if the code doesn't start with the required prefix, or if the author of the message is the bot, exit early    
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/); // splits the message into an array by spaces, <-- need to modify later
    const command = args.shift().toLowerCase(); // isolates the command statement 

    if(command == 'search'){
        client.commands.get('search').execute(message, args, main)
    } else if(command == 'add') {
        client.commands.get('add').execute(message, args, main);
    } else if(command === 'floop') { // sanity check command
        client.commands.get('floop').execute(message, args);
    }
});



// if (command === 'add-book') {
//     client.commands.get('book-list-commands').add_book(message, args);

// } else if (command === 'completed') {
//     message.channel.send(`Marking a book complete`);
//     client.commands.get('book-list-commands').mark_complete(message, args);

// } else if (command === 'in-progress') {
//     message.channel.send(`Changing book status to in progress`);
//     client.commands.get('book-list-commands').in_progress(message, args);

// } else if (command === 'delete-book') {
//     message.channel.send(`Deleting a book`);
//     client.commands.get('book-list-commands').delete_book(message, args);

// } else if(command === 'display-list') {
//     var book_list = client.commands.get('book-list-commands').get_book_list();
//     client.commands.get('display-list').execute(message, args, book_list); 

// } else if(command === 'delete-list') {
//     message.channel.send(`Removing all books from your list.`);

// } 