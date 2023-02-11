module.exports = {
	data: {
		name: "primaryButton",
	},
	async execute(interaction) {
		await interaction.reply({
			content: "https://youtube.com",
		});
	},
};
