const axios = require('axios');
module.exports = {
  name: 'meme',
  description: 'random meme',
  exec: async ({ sock, msg, from }) => {
    try {
      const res = await axios.get('https://meme-api.com/gimme');
      await sock.sendMessage(from, { image: { url: res.data.url }, caption: res.data.title }, { quoted: msg });
    } catch {
      await sock.sendMessage(from, { text: 'Failed to fetch meme.' }, { quoted: msg });
    }
  }
};
