const { SlashCommandBuilder } = require('discord.js');
const { danbooruUser, danbooruToken } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plot')
		.setDescription('Finds a random \"plot\" for you')
		.addStringOption(options =>
			options.setName('tags')
				.setDescription('Plot search tags (seperated by +)')),
	async execute(interaction) {
		let tags, img_link, error_count = 0, parit_count = 0;
		while (typeof img_link === 'undefined') {
			if (interaction.options.getString('tags') != null)
				tags = '+' + interaction.options.getString('tags');
			else
				tags = '';
			search = 'https://danbooru.donmai.us/posts/random.json?login='+danbooruUser+'&api_key='+danbooruToken+'&tags=rating%3Aexplicit+-guro+-scat+-loli+-pee+-shota+-bestiality+-rape'+tags;
			console.log(search);
			
			try {
				//make call to API
				post = await fetch(search)
				.then(response => {
					if (!response.ok) {
						error_count++;
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.catch(error => console.error('Fetch error:', 'UNABLE TO FIND PLOT'));
			} catch(error) {
				console.log('Fetch error: ' + error);
				error_count === 3;
			}
			parit_count++;
			if (error_count === 3) {
				await interaction.reply('I couldn\'t find any plots, sorry :(');
				break;
			}
			if (error_count < parit_count)
				img_link = await post.file_url;
		}

		if (error_count < parit_count) {
			console.log(post.file_url);
			await interaction.reply("Here's your plot: " + img_link);
		}
	},
};