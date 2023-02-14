const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
require("dotenv").config("../");

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
	.then(() => console.log("Successfully deleted all guild commands."))
	.catch(console.error);
