module.exports = {
  name: 'help',
  description: 'List commands',
  exec: async ({ sock, msg, from }) => {
    const text = `Santan v1 — Commands:
!help
!santan
!ping
!setcmd <name> <reply>
!meme
!quote
!joke
!weather <city>
!translate <lang> <text>
!play <query>
!skip
!queue
`;
    await sock.sendMessage(from, { text }, { quoted: msg });
  }
};
