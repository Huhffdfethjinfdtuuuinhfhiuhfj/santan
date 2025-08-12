const axios = require('axios');
module.exports = {
  name: 'quote',
  description: 'inspirational quote',
  exec: async ({ sock, msg, from }) => {
    try {
      const res = await axios.get('https://api.quotable.io/random');
      await sock.sendMessage(from, { text: `"${res.data.content}" — ${res.data.author}` }, { quoted: msg });
    } catch {
      await sock.sendMessage(from, { text: 'Failed to fetch quote.' }, { quoted: msg });
    }
  }
};
