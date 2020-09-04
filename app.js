
// GLOBAL
let GLOBAL;
try {
  GLOBAL = {
    discord: require('discord.js'),
    fs: require('fs'),
    pending: [],

    hdl : require('./master/handle.js')
  };
  GLOBAL ['config'] = JSON.parse(GLOBAL.fs.readFileSync('./master/config.json'));
  GLOBAL ['media'] = JSON.parse(GLOBAL.fs.readFileSync('./master/db/media.json'));
  GLOBAL ['cli'] = new GLOBAL.discord.Client();

  console.log(` [ >> ] - Katyusha Bot ${GLOBAL.config.version}\n  [ STATE ] - ${GLOBAL.config.state.toUpperCase()}\n  [ OK ] - GLOBAL`)
} catch (e) {
  console.log('   [ ERR ] - GLOBAL', e)
}

// DISCORD
try {
  GLOBAL.cli.login(GLOBAL.config[`${GLOBAL.config.state}-token`]);

  GLOBAL.cli.on('ready', () => {
    try {
      GLOBAL.cli.user.setActivity(GLOBAL.config.activity.split("#")[0], { type : GLOBAL.config.activity.split("#")[1]});

      console.log(' [ >> ] - Service Online\n')
    } catch (e) {
      console.log('   [ ERR ] - DISCORD / ON READY', e);
    }
  })

  GLOBAL.cli.on('message', async (message) => {
    try {
      if (!GLOBAL.hdl.filter(GLOBAL, message)) return

      GLOBAL.hdl.cmd(GLOBAL, message)
    } catch (e) {
      console.log('   [ ERR ] - DISCORD / ON MESSAGE', e);
    }
  })
  console.log('  [ OK ] - DISCORD')
} catch (e) {
  console.log('   [ ERR ] - DISCORD', e)
}

// AUTO SAVE
setInterval(() => {
  try {
    console.log('[ AUTO ] - Saving..')

    GLOBAL.fs.writeFileSync('./master/db/media.json', JSON.stringify(GLOBAL.media))
  } catch (e) {
    console.log('   [ ERR ] - AUTO SAVE', e)
  }
}, 30000)
