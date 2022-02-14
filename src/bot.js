require("dotenv").config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`)
});

client.on('message', (message) => {
    console.log(`${message.content}`);
    if (message.content == "!start_stream") {
        message.reply('Starting stream...');
    }
    if (message.content == "!end_stream") {
        message.reply('Ending stream...');
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);