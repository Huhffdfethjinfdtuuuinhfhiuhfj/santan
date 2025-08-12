const axios = require('axios');
module.exports = {
  name: 'translate',
  description: 'Translate: !translate <lang> <text>',
  exec: async ({ sock, msg, args, from }) => {
    if (args.length < 2) return sock.sendMessage(from, { text: 'Usage: !translate <lang> <text>' }, { quoted: msg });
    const lang = args.shift();
    const text = args.join(' ');
    try {
      const res = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`);
      await sock.sendMessage(from, { text: res.data.responseData.translatedText }, { quoted: msg });
    } catch {
      await sock.sendMessage(from, { text: 'Translation failed.' }, { quoted: msg });
    }
  }
};
