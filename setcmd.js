const fs = require('fs');
const path = require('path');
const store = path.join(__dirname, '..', 'data', 'customCmds.json');
if (!fs.existsSync(path.dirname(store))) fs.mkdirSync(path.dirname(store), { recursive: true });
if (!fs.existsSync(store)) fs.writeFileSync(store, JSON.stringify({}));

module.exports = {
  name: 'setcmd',
  description: 'Create a custom command: !setcmd name reply',
  exec: async ({ sock, msg, args, from }) => {
    if (args.length < 2) return sock.sendMessage(from, { text: 'Usage: !setcmd <name> <reply>' }, { quoted: msg });
    const [name, ...rest] = args;
    const reply = rest.join(' ');
    const data = JSON.parse(fs.readFileSync(store));
    data[name.toLowerCase()] = reply;
    fs.writeFileSync(store, JSON.stringify(data, null, 2));
    await sock.sendMessage(from, { text: `✅ Custom command !${name} set.` }, { quoted: msg });
  }
};
