/**
 * Santan v1 - minimal main
 * Requires: npm install
 */
const { default: makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require('@adiwajshing/baileys');
const P = require('pino');
const fs = require('fs');
const path = require('path');
const config = require('./config.example.json');

const SESSION_FILE = path.resolve(process.cwd(), config.SESSION_FOLDER || 'session', 'creds.json');
const sessionDir = path.dirname(SESSION_FILE);
if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });

const { state, saveState } = useSingleFileAuthState(SESSION_FILE);

(async () => {
  try {
    const { version } = await fetchLatestBaileysVersion().catch(()=>({version:[4,0,0]}));
    const sock = makeWASocket({
      logger: P({ level: 'silent' }),
      printQRInTerminal: true,
      auth: state,
      version
    });

    sock.ev.on('creds.update', saveState);

    // load commands
    const commands = new Map();
    const cmdsPath = path.join(__dirname, 'commands');
    fs.readdirSync(cmdsPath).forEach(f=>{
      if (f.endsWith('.js')) {
        const cmd = require(path.join(cmdsPath, f));
        commands.set(cmd.name, cmd);
      }
    });

    const customCmdFile = path.join(__dirname, 'data', 'customCmds.json');
    if (!fs.existsSync(path.dirname(customCmdFile))) fs.mkdirSync(path.dirname(customCmdFile), { recursive: true });
    if (!fs.existsSync(customCmdFile)) fs.writeFileSync(customCmdFile, JSON.stringify({}));

    // simple in-memory music queue
    const musicQueue = [];

    sock.ev.on('messages.upsert', async m => {
      try {
        const messages = m.messages;
        if (!messages) return;
        const msg = messages[0];
        if (!msg.message) return;
        if (msg.key && msg.key.remoteJid === 'status@broadcast') return;

        const from = msg.key.remoteJid;
        const sender = (msg.key.participant || msg.key.remoteJid) + '';

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        if (!text.startsWith(config.PREFIX)) return;

        const [cmdName, ...args] = text.slice(config.PREFIX.length).trim().split(/ +/);
        const lower = cmdName.toLowerCase();

        // built-in command
        if (commands.has(lower)) {
          await commands.get(lower).exec({ sock, msg, args, from, sender, musicQueue, config });
          return;
        }

        // custom commands
        const custom = JSON.parse(fs.readFileSync(customCmdFile));
        if (custom[lower]) {
          await sock.sendMessage(from, { text: custom[lower] }, { quoted: msg });
        }
      } catch (e) {
        console.error('msg handler error', e);
      }
    });

    // welcome handler
    sock.ev.on('group-participants.update', async (update) => {
      try {
        if (update.action === 'add') {
          for (let p of update.participants) {
            await sock.sendMessage(update.id, { text: `🎉 Welcome @${p.split('@')[0]}!`, mentions: [p] });
          }
        }
      } catch(e){ console.error(e) }
    });

    sock.ev.on('connection.update', (u) => {
      const { connection, lastDisconnect } = u;
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut);
        console.log('connection closed, reconnecting?', shouldReconnect);
        if (shouldReconnect) start();
      } else if (connection === 'open') {
        console.log('Santan v1 connected');
      }
    });

  } catch (e) {
    console.error(e);
  }
})();
