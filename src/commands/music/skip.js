const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skips the current song"),

	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guild.id);

		if (!queue) {
			await interaction.reply("There are no songs in the queue");
			return;
		}

		const currentSong = queue.current;

		if (queue.tracks.length > 0) await queue.play();
		else await queue.skip();

		const nextSong = queue.current;

		await interaction.reply(
			` ❌ | Skipped **${currentSong.title}**!\n:white_check_mark: | Now playing! **${nextSong.title}**`
		);
	},
};
