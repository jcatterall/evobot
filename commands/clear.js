const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "clear",
  aliases: ["clear"],
  description: "Clear all songs on the queue",
  execute(message, args) {
    
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) 
    {
      return;
    }
    
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;

    queue.songs = [];

    queue.connection.dispatcher.end();
  }
};
