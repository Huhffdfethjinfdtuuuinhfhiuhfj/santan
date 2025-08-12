const axios = require('axios');
module.exports = {
  name: 'joke',
  description: 'random joke',
  exec: async ({ sock, msg, from }) => {
    try {
      const res = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
      await sock.sendMessage(from, { text: res.data.joke }, { quoted: msg });
    } catch {
      await sock.sendMessage(from, { text: 'Failed to fetch joke.' }, { quoted: msg });
    }
  }
};
