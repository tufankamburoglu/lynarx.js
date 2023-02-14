const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("exit")
		.setDescription("Kick the bot from the channel."),
	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild.id);

		if (!queue) {
			await interaction.reply("There are no songs in the queue");
			return;
		}

		queue.destroy();

		await interaction.reply("Exitted the channel.");
	},
};
