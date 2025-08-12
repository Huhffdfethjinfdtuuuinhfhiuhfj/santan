module.exports = {
  name: 'santan',
  description: 'Unique Santan branded command',
  exec: async ({ sock, msg, from, pushName }) => {
    const text = `🔥 Santan v1 — Hello!\nUse !help to view commands.\nCreate custom commands with !setcmd.`;
    const buttons = [
      { buttonId: '!help', buttonText: { displayText: 'Help' }, type: 1 },
      { buttonId: '!play', buttonText: { displayText: 'Play Music' }, type: 1 }
    ];
    const buttonMessage = {
      text,
      footer: 'Santan v1',
      buttons,
      headerType: 1
    };
    await sock.sendMessage(from, buttonMessage, { quoted: msg });
  }
};
