
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import Discord from 'discord.js'

dotenv.config()

const client = new Discord.Client({intents: ['GUILDS','GUILD_MESSAGES']})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('messageCreate', (message) => {
    let channel = message.channel;

    if(message.content == '.start_stream')
    channel.createInvite({unique: true, maxAge: 21600})
    .then(invite => {
        const discord_link = 'https://discord.com/' + invite.code
        const url = 'https://api.nightbot.tv/1/commands/5e9cb8960da0ca095b5cdf84'
        const data = { message : 'Updated Link' + discord_link}
        const headers = { Authorization: process.env.NIGHT_BOT_ACCESS_TOKEN}

        fetch(url, { method: 'POST', headers: headers, body: data})
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
    })
})
    if (message.content == '.end_stream'){
        console.log('Ending stream...')s
    }
})

client.login(process.env.DISCORD_BOT_TOKEN)