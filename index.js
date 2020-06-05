const config = require('./config.json');
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
client.login(config.token);

// on --> this can trigger multiple times
client.on('message', message => {
    if(message.content == '!floop')
    {
        message.channel.send('shloop');
    }
});