
module.exports = {
  filter: (GLOBAL, message) => {
    if (message.author.bot || !message.guild) return false;
    return true;
  },
  cmd: (GLOBAL, message) => {
    let args = message.content.split(' '), cmd = args[0].toLowerCase();

    switch (cmd) {
      // HELP
      case `k!help`:
        module.exports.embed(GLOBAL, message, `Katy's Menu&k!tank - Tanks in Discord.\nk!invite - Invite Katy.`, 0x2f3136)
        return;
      break;

      // TANK
      case `k!tank`:
        let r = Math.floor(Math.random() * GLOBAL.media['tank'].length);
        module.exports.imageEmbed(GLOBAL, message, `Katy's Tank`, GLOBAL.media['tank'][r], 0x2f3136)
        return;
      break;

      // INVITE
      case `k!invite`:
        module.exports.embed(GLOBAL, message, `Invite Katy&https://bit.ly/3h4bspH`, 0x2f3136)
        return;
      break;

      // ADD
      case `k!add`:
        if (message.author.id == '432823255682777090') {
          for (i in args) {
            if (i > 1) {
              GLOBAL.media[args[1]].push(args[i])
              module.exports.imageEmbed(GLOBAL, message, `Added media to ${args[1]}`, args[i], 0x2f3136)
            }
          }
        }
        return;
      break;
    }
  },
  embed: (GLOBAL, message, text, color) => {
    message.channel.send({embed: {
      color: color,
      title: text.split('&')[0],
      description: text.split('&')[1],
    }})
  },
  imageEmbed: (GLOBAL, message, text, image, color) => {
    message.channel.send({embed: {
      color: color,
      title: text.split('&')[0],
      image: {
        url: image
      },
      footer: {
        text: 'Type k!help to show more commands | Want to k!invite Katy?'
      }
    }})
  },
  client: (GLOBAL, message, guildID) => {
    for (i in GLOBAL.db[guildID].clients) {
      if (GLOBAL.db[guildID].clients[i].id == message.author.id) return i;
    }

    GLOBAL.db[guildID].clients.push({
      id: message.author.id,
      bal: GLOBAL.db[guildID].config.bal,
      timeout: {
        daily: 0,
        weekly: 0
      }
    })
    return GLOBAL.db[guildID].clients.length - 1;
  },
  guild: (GLOBAL, message) => {
    for (i in GLOBAL.db) {
      if (GLOBAL.db[i].id == message.guild.id) return i;
    }

    GLOBAL.db.push({
      id: message.guild.id,
      config: GLOBAL.config.default,
      clients: []
    })
    return GLOBAL.db.length - 1;
  }
}
