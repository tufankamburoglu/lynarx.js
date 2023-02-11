const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("reactor")
		.setDescription("Returns reactions."),
	async execute(interaction, client) {
		const message = await interaction.reply({
			content: "React here!",
			fetchReply: true,
		});

		/* const emoji = message.guild.emojis.cache.find((Emoji) => (Emoji.id = '823610543520612364'));

		message.react(emoji);
		message.react('👍');

		const filter = (reaction, user) => {
			return reaction.emoji.name == '👍' && user.id == interaction.user.id;
		};

		const collector = message.createReactionCollector({ filter, time: 5000 });

		collector.on('collect', (reaction, user) => {
			console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
		}); */

		const filter = (reaction, user) => {
			return (
				reaction.emoji.name == "👍" && user.id == interaction.user.id
			);
		};

		message
			.awaitReactions({ filter, max: 4, time: 5000, errors: ["time"] })
			.then((collected) => console.log(collected.size))
			.catch((collected) => {
				console.log(
					`After five seconds, only ${collected.size} out of 4 reacted.`
				);
			});
	},
};
