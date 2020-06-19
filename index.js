
const fs = require('fs');
const {prefix, token} = require('./config.json');
// ask for the discord.js module (require it)
const Discord = require('discord.js');

// create a new client 
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// once the client is ready, run this code
// this event will only trigger one time after logging in 
client.once('ready', () => {
	console.log('Ready!');
});

// attempt at an embedded message
// const exampleEmbed = new Discord.MessageEmbed()
// 	.setColor('#0099ff')
// 	.setTitle('Book List')
// 	.setDescription('Some description here')
// 	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
// 	.addFields(
// 		{ name: 'Regular field title', value: 'Some value here' },
// 		{ name: '\u200B', value: '\u200B' },
// 		{ name: 'Inline field title', value: 'Some value here', inline: true },
// 		{ name: 'Inline field title', value: 'Some value here', inline: true },
// 	)
// 	.addField('Inline field title', 'Some value here', true)
// 	.setImage('https://i.imgur.com/wSTFkRM.png')
// 	.setTimestamp()
// 	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

// channel.send(exampleEmbed);

// login to Discord with app's token
client.login(token);

// on --> this can trigger multiple times
client.on('message', message => {
    // if the code doesn't start with the required prefix, or if the author of the message is the bot, exit early
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/); // splits the message into an array by spaces, <-- need to modify later
    const command = args.shift().toLowerCase(); // isolates the command statement 

    if (command === 'add-book') {
        if (!args.length) { // if the user didn't provide any other arguments after the command
            return message.channel.send(`You didn't provide any arguments! Type !commands for command descriptions.`);
        } else if (args[0] === ``) {
            return message.channel.send(`You didn't provide a book title! Type !commands for command descriptions.`);
        } else {
            client.commands.get('book-list-commands').add_book();
        }
        
        console.log(args[0]);
        console.log(args[1]);
        
         
        message.channel.send(`Book added: ${args[0]} by ${args[1]}`);

    } else if(command === 'floop') { // sanity check command
        client.commands.get('floop').execute(message, args);
    } 
});