const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const path = require('path');
const fs = require('fs');
const musicUtil = require('../utils/music');

module.exports = {
  name: 'play',
  description: 'Add song to queue: !play <query>',
  exec: async ({ sock, msg, args, from, musicQueue }) => {
    if (!args.length) return sock.sendMessage(from, { text: 'Usage: !play <song name or url>' }, { quoted: msg });
    const query = args.join(' ');
    let info;
    try {
      if (ytdl.validateURL(query)) {
        info = await ytdl.getInfo(query);
      } else {
        const r = await ytSearch(query);
        if (!r || !r.videos || r.videos.length === 0) return sock.sendMessage(from, { text: 'No results found.' }, { quoted: msg });
        info = await ytdl.getInfo(r.videos[0].url);
      }
      const song = { title: info.videoDetails.title, url: info.videoDetails.video_url };
      musicQueue.push(song);
      await sock.sendMessage(from, { text: `🎶 Added to queue: ${song.title}` }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(from, { text: 'Failed to add to queue.' }, { quoted: msg });
    }
  }
};
