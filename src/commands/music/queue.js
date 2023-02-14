const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Returns song queue"),
	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild.id);

		if (!queue) {
			await interaction.reply("There are no songs in the queue");
			return;
		}

		await interaction.reply(
			`Current queue: ${queue.tracks
				.map((track, i) => {
					return `${i === 0 ? "Current song" : `#${i + 1}`} - ${
						track.title
					}`;
				})
				.join("\n")}`
		);
	},
};
