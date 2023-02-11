const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const fs = require("fs");

module.exports = (client) => {
	client.handleCommands = async () => {
		const commandFolders = fs.readdirSync("./src/commands");
		const { commands, commandArray } = client;

		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`./src/commands/${folder}`)
				.filter((file) => file.endsWith(".js"));

			for (const file of commandFiles) {
				const command = require(`../../commands/${folder}/${file}`);
				commands.set(command.data.name, command);
				commandArray.push(command.data.toJSON());
				console.log(`Command: ${command.data.name} has been added.`);
			}
		}

		const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
		const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
		try {
			console.log("Started refreshing slash commands.");

			await rest.put(
				Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
				{ body: commandArray }
			);

			console.log("Sucessfully reloaded slash commands.");
		} catch (error) {
			console.error(error);
		}
	};
};
