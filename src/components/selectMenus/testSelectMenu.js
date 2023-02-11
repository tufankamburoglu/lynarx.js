module.exports = {
	data: {
		name: "testSelectMenu",
	},
	async execute(interaction) {
		await interaction.reply({
			content: `You select: ${interaction.values[0]}`,
		});
	},
};
