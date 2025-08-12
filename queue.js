module.exports = {
  name: 'queue',
  description: 'Show queue',
  exec: async ({ sock, msg, from, musicQueue }) => {
    if (!musicQueue.length) return sock.sendMessage(from, { text: 'Queue is empty.' }, { quoted: msg });
    const list = musicQueue.map((s,i)=>`${i+1}. ${s.title}`).join('\n');
    await sock.sendMessage(from, { text: `Queue:\n${list}` }, { quoted: msg });
  }
};
