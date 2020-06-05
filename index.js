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
client.login('NzE4Mzk0MDIzNTI5OTM4OTc2.XtoPqQ.o3UGqsThk7WYVEYCnCpex3vcU58');


