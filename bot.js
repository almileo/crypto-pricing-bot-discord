//Dependencies
const { Client } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios');
const availableTokens = require('./availableTokens.json');

//Load env
dotenv.config();

//Create bot instance
const bot = new Client();

//Bot login
bot.login(process.env.DISCORD_BOT_TOKEN);



//First command - '!ping'
bot.on('ready', () => {
    console.log(`${bot.user.username} is working fine.`);
});

bot.on('message', async (msg) => {
    if (msg.author.bot) { //Do not reply if message is sent from bot
        return
    }

    if (msg.content.startsWith('!ping')) {
        return msg.reply('I am working fine');
    }

    //'!price' command
    if (msg.content.startsWith('!price')) {
        const [command, ...args] = msg.content.split(' ');
        console.log('args: ', args);
        const [tokenMsg] = args;
        console.log('tokenMsg: ', tokenMsg);
        //Look for the coincidence in the json file.
        const tokenRequested = availableTokens.token.find((t) => {
           return t.name == tokenMsg;
        });
        console.log('tokenRequested: ', tokenRequested);

        try {
            //check if token requested exist
            if(!tokenRequested) {
                return msg.reply('Please check the name of the token. It should be listed in !token command');
            }

            const chainId = tokenRequested.chainId; //Look for chainId in json file.
            const pairAddress = tokenRequested.pairAddress;

            const { data } = await axios.get(`https://api.dexscreener.io/latest/dex/pairs/${chainId}/${pairAddress}`);
            console.log('data: ', data);
            if (!data) throw Error();

            return msg.reply(`The price of 1 ${data.pair.baseToken.symbol} is ${data.pair.priceUsd} USD`);
            
        } catch (error) {
            console.log('error: ', error);
            return msg.reply('Please check your inputs. The token has to be listed in !token command');
        }
    }

})

