const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pause")
		.setDescription("Pauses the current song"),
	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild.id);

		if (!queue) {
			await interaction.reply("There are no songs in the queue");
			return;
		}

		queue.setPaused(true);

		await interaction.reply("Player has been paused.");
	},
};
