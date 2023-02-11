const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("modal")
		.setDescription("Returns a modal."),
	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("testModalInput")
				.setLabel("What is what is what?")
				.setRequired(true)
				.setStyle(TextInputStyle.Short)
		);

		const modal = new ModalBuilder()
			.setCustomId("testModal")
			.setTitle("Test Modal")
			.addComponents(row);

		await interaction.showModal(modal);
	},
};
