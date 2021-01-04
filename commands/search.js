

var self = module.exports = {
	name: 'search',
    description: 'searches for a book using the Google Books API',

	async execute(message, args, main) {
        var search = args.join(" ");

        var isLink = search.includes("google.com/books");

        try {
            var book = await main.searchBook(search, isLink);
            if(book instanceof String) {
                message.channel.send(book);
            } else {
                message.channel.send(main.buildNewBookEmbed(book));
            }
            // message.channel.send(await main.searchBook(search, isLink));

        } catch(e) {
            console.error("search.js", e);
            message.channel.send('Something went wrong.');
        }
		
	}
}