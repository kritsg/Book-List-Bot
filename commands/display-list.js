const Discord = require('discord.js');

// attempt at an embedded message based off the documentation example
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#AECDAD')
	.setTitle('Book List')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u2611', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');


var self = module.exports = {
    name: 'display-list',
    description: 'shows the book list using MessageEmbed',

	execute: function(message, args, book_list) {
        message.channel.send(exampleEmbed);
	}
}