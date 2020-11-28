/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./util/EvobotUtil");
const ytdlDiscord = require("ytdl-core-discord");
const { play } = require("./include/play");

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`${PREFIX}help and ${PREFIX}play`, { type: "LISTENING" });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});

var lastRan = {};
lastRan["205331201764884481"] = null;
lastRan["359030500465311762"] = null;
lastRan["198454964153090059"] = null;

client.on('voiceStateUpdate', async (oldMember, newMember) => {

  var playTime = 10;
  var defaultLength = 30;
  var timeAllowedToRun = 15;

  //Trav
  if(newMember.id == "205331201764884481")
  {
    var lastRanTime = lastRan["205331201764884481"];

    if(lastRanTime != null)
    {
      var timeNow = new Date().getUTCDate();

      var diff =(timeNow.getTime() - lastRanTime.getTime()) / 1000;
      diff /= 60;
  
      if(diff <= timeAllowedToRun)
      {
        return;
      }
    }

    const { channel } = newMember;
    channel.join();

    var queue = client.queue.get(newMember.guild.id);
    console.log("queue: " + queue)

    if (typeof queue !== "undefined")
    {
      if(queue.playing)
      {
        queue.playing = false;
        queue.connection.dispatcher.pause(true);
        console.log("paused")
      }
    }
    
    const broadcast = client.voice.createBroadcast();
    broadcast.play('thunderstruck.mp3');

    for (const connection of client.voice.connections.values()) {
      connection.play(broadcast);
    }

    if (playTime !== -1) {
        setTimeout(() => {
          if (typeof queue !== "undefined")
          {
            if (!queue.playing) 
            {
              queue.playing = true;
              queue.connection.dispatcher.end();
              play(queue.songs[0], newMember);
            }
          }

          broadcast.dispatcher.end();

        }, (playTime || defaultLength) * 1000);
    }

    lastRan["205331201764884481"] = new Date().getUTCDate();
  }

  //Ziya
  if(newMember.id == "359030500465311762")
  {
    var lastRanTime = lastRan["359030500465311762"];

    if(lastRanTime != null)
    {
      var timeNow = new Date().getUTCDate();

      var diff =(timeNow.getTime() - lastRanTime.getTime()) / 1000;
      diff /= 60;
  
      if(diff <= timeAllowedToRun)
      {
        return;
      }
    }

    const { channel } = newMember;
    channel.join();

    var queue = client.queue.get(newMember.guild.id);
    console.log("queue: " + queue)

    if (typeof queue !== "undefined")
    {
      if(queue.playing)
      {
        queue.playing = false;
        queue.connection.dispatcher.pause(true);
        console.log("paused")
      }
    }
    
    const broadcast = client.voice.createBroadcast();
    broadcast.play('shaneomac.mp3');

    for (const connection of client.voice.connections.values()) {
      connection.play(broadcast);
    }

    if (playTime !== -1) {
        setTimeout(() => {
          if (typeof queue !== "undefined")
          {
            if (!queue.playing) 
            {
              queue.playing = true;
              queue.connection.dispatcher.end();
              play(queue.songs[0], newMember);
            }
          }

          broadcast.dispatcher.end();

        }, (playTime || defaultLength) * 1000);
    }
  }

  //Biff
  if(newMember.id == "198454964153090059")
  {
    var lastRanTime = lastRan["198454964153090059"];

    if(lastRanTime != null)
    {
      var timeNow = new Date().getUTCDate();

      var diff =(timeNow.getTime() - lastRanTime.getTime()) / 1000;
      diff /= 60;
  
      if(diff <= timeAllowedToRun)
      {
        return;
      }
    }

    const { channel } = newMember;
    channel.join();

    var queue = client.queue.get(newMember.guild.id);
    console.log("queue: " + queue)

    if (typeof queue !== "undefined")
    {
      if(queue.playing)
      {
        queue.playing = false;
        queue.connection.dispatcher.pause(true);
        console.log("paused")
      }
    }
    
    const broadcast = client.voice.createBroadcast();
    broadcast.play('backinblack.mp3');

    for (const connection of client.voice.connections.values()) {
      connection.play(broadcast);
    }

    if (playTime !== -1) {
        setTimeout(() => {
          if (typeof queue !== "undefined")
          {
            if (!queue.playing) 
            {
              queue.playing = true;
              queue.connection.dispatcher.end();
              play(queue.songs[0], newMember);
            }
          }

          broadcast.dispatcher.end();

        }, (playTime || defaultLength) * 1000);
    }
  }

});