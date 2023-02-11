module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		setTimeout(client.pickPresence, 1 * 1000);
		//setTimeout(client.checkVideo, 1 * 1000);
		//setInterval(client.checkVideo, 60 * 1000);
		console.log(`${client.user.tag} has logged into Discord!`);	
	},
};
