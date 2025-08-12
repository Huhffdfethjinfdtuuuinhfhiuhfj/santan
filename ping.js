module.exports = {
  name: 'ping',
  description: 'latency',
  exec: async ({ sock, msg, from }) => {
    const now = Date.now();
    await sock.sendMessage(from, { text: 'Pong! ' + now }, { quoted: msg });
  }
};
