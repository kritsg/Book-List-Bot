const fetch = require('node-fetch');
const Discord = require('discord.js');

var self = module.exports = {
    searchBook: async function(message, search, isLink, api_key)
    {
        if(!search.trim().length) {
            return "Your search query is empty!";
        } else if(isLink) {
            var id = search.split("/")[6].substring(0, 12);
            var book = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`).then(response => response.json()); // : await fetch
            return self.buildNewBookEmbed(book);
        } else {
            var initialData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&key=${api_key}`).then(response => response.json()); // : await fetch
            if(initialData.totalItems > 0) {
                return self.buildNewBookEmbed(initialData.items[0]);
            } else {
                return "No books found!";
            }
        }
    }, 

    buildNewBookEmbed: function(book) {
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
        
        return embed;
    }
}