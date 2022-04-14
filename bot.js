//Dependencies
const { Client } = require('discord.js');
const dotenv = require('dotenv');

//Load env
dotenv.config();

//Create bot instance
const bot = new Client();

//Bot login
bot.login(process.env.DISCORD_BOT_TOKEN);



//First command
bot.on('ready', () => {
    console.log(`${bot.user.username} is working fine.`);
});

bot.on('message', async (msg) => {
    if (msg.author.bot) { //Do not reply if message is sent from bot
        return
    }

    if (msg.content.startsWith('!ping')) {
        return msg.reply('I am working fine')
    }
})