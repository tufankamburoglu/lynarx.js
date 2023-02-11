const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("button")
		.setDescription("Returns a button."),
	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("primaryButton")
				.setLabel("Click Me!")
				.setStyle(ButtonStyle.Primary)
		);

		await interaction.reply({
			content: "I think you should,",
			components: [row],
		});
	},
};
