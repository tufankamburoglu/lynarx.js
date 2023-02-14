const { SlashCommandBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays a song.")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Searches for a song and plays it")
				.addStringOption((option) =>
					option
						.setName("search_terms")
						.setDescription("search keywords")
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Plays a playlist from YT")
				.addStringOption((option) =>
					option
						.setName("url")
						.setDescription("the playlist's url")
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song")
				.setDescription("Plays a single song from YT")
				.addStringOption((option) =>
					option
						.setName("url")
						.setDescription("the song's url")
						.setRequired(true)
				)
		),
	async execute(interaction, client) {
		if (!interaction.member.voice.channelId)
			return await interaction.reply({
				content: "You are not in a voice channel!",
				ephemeral: true,
			});

		if (
			interaction.guild.members.me.voice.channelId &&
			interaction.member.voice.channelId !==
				interaction.guild.members.me.voice.channelId
		)
			return await interaction.reply({
				content: "You are not in my voice channel!",
				ephemeral: true,
			});

		const queue = client.player.createQueue(interaction.guild, {
			disableVolume: false,
			metadata: {
				channel: interaction.channel,
			},
		});

		try {
			if (!queue.connection)
				await queue.connect(interaction.member.voice.channel);
		} catch (error) {
			console.error(error);
			queue.destroy();
			return await interaction.reply({
				content: "Could not join your voice channel!",
				ephemeral: true,
			});
		}
		await interaction.deferReply();

		if (interaction.options.getSubcommand() === "song") {
			let url = interaction.options.getString("url");

			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO,
			});

			if (result.tracks.length === 0)
				return interaction.followUp("No results");

			const track = result.tracks[0];

			if (queue.nowPlaying()) {
				await queue.addTrack(track);
				return await interaction.followUp({
					content: `⏱️ | Added **${track.title}** to queue!`,
				});
			} else {
				await queue.play(track);
				return await interaction.followUp({
					content: `:white_check_mark: | Now playing! **${track.title}**`,
				});
			}
		} else if (interaction.options.getSubcommand() === "playlist") {
			let url = interaction.options.getString("url");
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST,
			});

			if (result.tracks.length === 0)
				return interaction.followUp(`No playlists found with ${url}`);

			await queue.addTracks(result.tracks);

			if (!queue.nowPlaying() || !queue.playing) {
				await queue.play();
				return await interaction.followUp({
					content: `:white_check_mark: | Now playing! **${
						queue.nowPlaying().title
					}** to queue!`,
				});
			}

			return await interaction.followUp({
				content: `Playlist added to queue!`,
			});
		} else if (interaction.options.getSubcommand() === "search") {
			let query = interaction.options.getString("search_terms");
			const track = await client.player
				.search(query, {
					requestedBy: interaction.user,
					searchEngine: QueryType.AUTO,
				})
				.then((x) => x.tracks[0]);
			if (!track)
				return await interaction.followUp({
					content: `❌ | **${query}** not found!`,
				});

			if (queue.nowPlaying()) {
				await queue.addTrack(track);
				return await interaction.followUp({
					content: `⏱️ | Added **${track.title}** to queue!`,
				});
			} else {
				await queue.play(track);
				return await interaction.followUp({
					content: `:white_check_mark: | Now playing! **${track.title}**`,
				});
			}
		}
	},
};
