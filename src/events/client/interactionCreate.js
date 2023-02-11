const { InteractionType } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	async execute(interaction, client) {
		if (interaction.isChatInputCommand()) {
			console.log(
				`${interaction.user.tag} in #${interaction.channel.name} triggered the "${interaction.commandName}".`
			);
			const command = interaction.client.commands.get(
				interaction.commandName
			);

			if (!command) return;

			try {
				await command.execute(interaction, client);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			}
		} else if (interaction.isButton()) {
			const button = client.buttons.get(interaction.customId);
			if (!button) return new Error("There is no button for this code.");

			try {
				await button.execute(interaction, client);
			} catch (err) {
				console.error(err);
			}
		} else if (interaction.isStringSelectMenu()) {
			const menu = client.selectMenus.get(interaction.customId);
			if (!menu) return new Error("There is no menu for this code.");

			try {
				await menu.execute(interaction, client);
			} catch (err) {
				console.error(err);
			}
		} else if (interaction.type == InteractionType.ModalSubmit) {
			const modal = client.modals.get(interaction.customId);
			if (!modal) return new Error("There is no modal for this code.");

			try {
				await modal.execute(interaction, client);
			} catch (err) {
				console.error(err);
			}
		} else if (interaction.isContextMenuCommand()) {
			const { commands } = client;
			const { commandName } = interaction;
			const contextCommand = commands.get(commandName);
			if (!contextCommand) return;

			try {
				await contextCommand.execute(interaction, client);
			} catch (error) {
				console.error(error);
			}
		} else if (
			interaction.type == InteractionType.ApplicationCommandAutocomplete
		) {
			const { commands } = client;
			const { commandName } = interaction;
			const command = commands.get(commandName);
			if (!command) return;

			try {
				await command.autocomplete(interaction, client);
			} catch (error) {
				console.error(error);
			}
		}
	},
};
