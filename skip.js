module.exports = {
  name: 'skip',
  description: 'Skip current song (removes head of queue)',
  exec: async ({ sock, msg, from, musicQueue }) => {
    if (!musicQueue.length) return sock.sendMessage(from, { text: 'Queue empty.' }, { quoted: msg });
    const skipped = musicQueue.shift();
    await sock.sendMessage(from, { text: `⏭ Skipped: ${skipped.title}` }, { quoted: msg });
  }
};
