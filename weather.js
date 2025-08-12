const axios = require('axios');
module.exports = {
  name: 'weather',
  description: 'Get weather: !weather <city>',
  exec: async ({ sock, msg, args, from }) => {
    if (!args.length) return sock.sendMessage(from, { text: 'Usage: !weather <city>' }, { quoted: msg });
    const city = args.join(' ');
    try {
      const key = process.env.WEATHER_API_KEY || '';
      if (!key) return sock.sendMessage(from, { text: 'Weather API key not set. Set WEATHER_API_KEY.' }, { quoted: msg });
      const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${encodeURIComponent(city)}`);
      const d = res.data;
      await sock.sendMessage(from, { text: `${d.location.name}, ${d.location.country}\n${d.current.condition.text} | ${d.current.temp_c}°C` }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(from, { text: 'Could not fetch weather.' }, { quoted: msg });
    }
  }
};
