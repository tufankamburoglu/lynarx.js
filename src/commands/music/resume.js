const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("resume")
		.setDescription("Resumes the current song"),
	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild.id);

		if (!queue) {
			await interaction.reply("No songs in the queue");
			return;
		}

		queue.setPaused(false);

		await interaction.reply("Player has been resumed.");
	},
};
