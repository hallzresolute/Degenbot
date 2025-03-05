const { REST, Routes } = require('discord.js');
const { applicationID, guildID, discordToken } = require('./config.json');

const rest = new REST().setToken(discordToken);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(applicationID, guildID), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(applicationID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);
