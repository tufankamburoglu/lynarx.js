const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");
require("dotenv").config();

const { DISCORD_TOKEN, DATABASE_TOKEN } = process.env;

const client = new Client({ intents: 32767 });

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolder = fs.readdirSync("./src/functions");
for (const folder of functionFolder) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of functionFiles) {
		require(`./functions/${folder}/${file}`)(client);
	}
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
mongoose.set("strictQuery", false);
(async () => {
	await mongoose.connect(DATABASE_TOKEN).catch(console.error);
})();
client.login(DISCORD_TOKEN);
