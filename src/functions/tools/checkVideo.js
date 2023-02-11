const Parser = require("rss-parser");
const parser = new Parser();
const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const { channel } = require("diagnostics_channel");

module.exports = (client) => {
	client.checkVideo = async () => {
		const data = await parser
			.parseURL(
				"https://youtube.com/feeds/videos.xml?channel_id=UC9zY_E8mcAo_Oq772LEZq8Q"
			)
			.catch(console.error);

		const rawData = fs.readFileSync(`${__dirname}/../../json/video.json`);
		const jsonData = JSON.parse(rawData);

		if (jsonData.id !== data.items[0].id) {
			fs.writeFileSync(
				`${__dirname}/../../json/video.json`,
				JSON.stringify({ id: data.items[0].id })
			);

			const guild = await client.guilds
				.fetch("594584053882159138")
				.catch(console.error);
			const channel = await guild.channels
				.fetch("1019722530526875782")
				.catch(console.error);

			const { title, link, id, author } = data.items[0];
			const embed = new EmbedBuilder({
				title: title,
				url: link,
				timestamp: Date.now(),
				image: {
					url: `https://img.youtube.com/vi/${id.slice(
						9
					)}/maxresdefault.jpg`,
				},
				author: {
					name: author,
				},
				footer: {
					text: client.user.tag,
					iconURL: client.user.displayAvatarURL(),
				},
			});

			await channel.send({ embeds: [embed] }).catch(console.error);
		}
	};
};
