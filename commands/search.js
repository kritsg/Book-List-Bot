var helper = require('./helper.js');

var self = module.exports = {
	name: 'search',
    description: 'searches for a book using the Google Books API',

	async execute(message, args, api_key) {
        var search = args.join(" ");
        console.log(helper);
        var isLink = search.includes("google.com/books");

        try {
            message.channel.send(await helper.searchBook(message, search, isLink, api_key));

        } catch(e) {
            console.error("search.js", e);
            message.channel.send('Something went wrong.');
        }
		
	}
}