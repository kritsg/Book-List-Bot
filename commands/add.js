var helper = require('./helper.js');

var self = module.exports = {
	name: 'add',
    description: 'Searches for a book and checks if user wishes to add said book to the list',

    async execute(message, args, api_key) {
        var search = args.join(" ");
        var isLink = search.includes("google.com/books");
        try { 
            message.channel.send(await helper.searchBook(message, search, isLink, api_key))
                .then(async (embedMessage) => {
                    const filter = (reaction, user) => {return (reaction.emoji.name == '👍' || reaction.emoji.name == '👎') && user.id == message.author.id;};
                    
                    try {
                        await embedMessage.react('👍');
                        await embedMessage.react('👎');
                    } catch (e) {
                        console.log("Message deleted");
                    }
    
                    embedMessage.awaitReactions(filter, {max: 1, time: 15000, errors: ["time"]}).then(function(collected) {
                        const reaction = collected.first();
                        if (reaction.emoji.name == '👍') {
                            message.channel.send('Book will be added');
                        } else {
                            message.channel.send("Book will not be added");
                        }
                    }).catch(() => {
                        message.channel.send("You didnt respond in time");
                    });
                    
                });
        } catch (e) {
            console.error('add.js', e);
            message.channel.send('something went wrong');
        }
    }
}


