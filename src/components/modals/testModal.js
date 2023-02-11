module.exports = {
	data: {
		name: "testModal",
	},
	async execute(interaction) {
		await interaction.reply({
			content: `You submitted: ${interaction.fields.getTextInputValue(
				"testModalInput"
			)}`,
		});
	},
};
