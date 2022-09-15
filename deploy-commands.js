const fs = require('node:fs');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config();

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands = [];
const commandFolders = fs.readdirSync('./src/commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./src/commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
		console.log(`Command: ${command.data.name} has been added.`);
	}
}
const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);