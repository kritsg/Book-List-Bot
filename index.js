const {prefix, token} = require('./config.json');
// ask for the discord.js module (require it)
const Discord = require('discord.js');

// create a new client 
const client = new Discord.Client();

// once the client is ready, run this code
// this event will only trigger one time after logging in 
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with app's token
client.login(token);

// on --> this can trigger multiple times
client.on('message', message => {
    // if the code doesn't start with the required prefix, or if the author of the message is the bot, exit early
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' '); // splits the message into an array by spaces
    const command = args.shift().toLowerCase(); // isolates the command statement 

    if (command === 'add-book') {
        if (!args.length) { // if the user didn't provide any other arguments after the command
            return message.channel.send(`You didn't provide any arguments! Type !commands for help`);
        }
    } else if(command === 'floop') { // sanity check if statement
        message.channel.send('shloop');
    } 
});