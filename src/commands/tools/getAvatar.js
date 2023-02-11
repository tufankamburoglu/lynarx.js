const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
} = require("discord.js");

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("getAvatar")
		.setType(ApplicationCommandType.User),
	async execute(interaction) {
		await interaction.reply({
			content: `${interaction.targetUser.displayAvatarURL()}`,
		});
	},
};