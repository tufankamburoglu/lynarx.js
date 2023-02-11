const {
	SlashCommandBuilder,
	ActionRowBuilder,
	SelectMenuBuilder,
	SelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("menu")
		.setDescription("Returns a select menu."),
	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new SelectMenuBuilder()
				.setCustomId("testSelectMenu")
				.setPlaceholder("Nothing selected")
				.setMinValues(1)
				.setMaxValues(1)
				.setOptions(
					new SelectMenuOptionBuilder({
						label: "Option #1",
						description: "This is a description",
						value: "value 1",
					}),
					new SelectMenuOptionBuilder({
						label: "Option #2",
						description: "This is also a description",
						value: "value 2",
					})
				)
		);

		await interaction.reply({
			content: "Choose one,",
			components: [row],
		});
	},
};
