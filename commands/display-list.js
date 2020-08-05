const Discord = require('discord.js');
const booklib = require('./BookObject.js')
// symbols for each status 
var unread = '\u2610';
var in_progress = ':orange_square:';
var completed = '\u2611';

// skeleton of the embedded message
var listEmbed = new Discord.MessageEmbed()
	.setColor('#AECDAD')
	.setTitle('Book List')
	// .addFields(
	// 	{ name: 'uhwegweg', value: unread + ' ' + 'hihihi'})
	// 	{ name: ':orange_square:', value: '\u2611' },
	// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
	// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
	// )
	// .addField('Inline field title', 'Some value here', true)
	.setTimestamp();
	// .setFooter('Some footer text here', '../BookListPicture.JPG');

updateEmbed = function(message, book_list) {
	// not ideal, but clears all the current entries and they're added again along with new ones form the book list
	if (book_list.length == 0) {
		return;
	} 
	console.log('here');
	listEmbed.fields = [];
	for (const book of book_list) {
		index = book_list.indexOf(book) + 1
		if (book.status === 'unread') {
			console.log(book.fullTitle);
			listEmbed.addField(`Book #${index}`, `${unread} ${book.bookTitle} by ${book.bookAuthor}`, false);
		} else if (book.status === 'in_progress') {
			listEmbed.addField(`Book #${index}`, `${in_progress} ${book.bookTitle} by ${book.bookAuthor}`, false);
		} else if (book.status === 'complete') {
			listEmbed.addField(`Book #${index}`, `${completed} ${book.bookTitle} by ${book.bookAuthor}`, false);
		}
	}	
	message.channel.send(listEmbed);
}


var self = module.exports = {
    name: 'display-list',
    description: 'shows the book list using MessageEmbed',

	execute: function(message, args, book_list) {
		updateEmbed(message, book_list);   
	}
}