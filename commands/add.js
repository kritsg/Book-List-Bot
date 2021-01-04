

var self = module.exports = {
	name: 'add',
    description: 'Searches for a book and checks if user wishes to add said book to the list',

    async execute(message, args, main) {
        var search = args.join(" ");
        var isLink = search.includes("google.com/books");
        try { 
            var book = await main.searchBook(search, isLink);
            if(book instanceof String) {
                message.channel.send(book);
            } else {
                var newBook = new main.bookModel({
                    primaryKey: message.guild.id + book.id, 
                    guildID: message.guild.id,
                    bookID: book.id, 
                    title: book.volumeInfo.title,
                    author: book.volumeInfo.authors,
                    description: book.volumeInfo.description,
                    categories: book.volumeInfo.categories,
                    pageCount: book.volumeInfo.pageCount,
                    imageURL: book.volumeInfo.imageLinks.thumbnail,
                    bookURL: `https://www.google.com/books/edition/${encodeURIComponent(book.volumeInfo.title)}/${book.id}`
                })
                message.channel.send('Is this the book you want to add?');
                message.channel.send(main.buildNewBookEmbed(book))
                .then(async (embedMessage) => {
                    const filter = (reaction, user) => {return (reaction.emoji.name == '✅' || reaction.emoji.name == '❌') && user.id == message.author.id;};
                    
                    try {
                        await embedMessage.react("✅");
                        await embedMessage.react("❌");
                    } catch (e) {
                        console.log("Message deleted");
                    }
    
                    embedMessage.awaitReactions(filter, {max: 1, time: 15000, errors: ["time"]}).then(function(collected) {
                        const reaction = collected.first();
                        if (reaction.emoji.name == '✅') {
                            message.channel.send('Book will be added');
                            newBook.save(function(err) {
                                console.log(err);
                                if(err && err.name == "MongoError") {
                                    message.channel.send("Book is already in your list");
                                }
                                else if(err) {
                                    message.channel.send('Something went wrong');
                                }
                            });
                        } else {
                            message.channel.send("Book will not be added");
                        }
                    }).catch(() => {
                        message.channel.send("You didnt respond in time");
                    });
                    
                });


            }
        } catch (e) {
            console.error('add.js', e);
            message.channel.send('something went wrong');
        }
    }
}


