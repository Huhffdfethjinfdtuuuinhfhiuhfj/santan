const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');
ffmpeg.setFfmpegPath(ffmpegPath);

module.exports = {
  downloadToMp3: (url, outPath) => {
    return new Promise((resolve, reject) => {
      const stream = ytdl(url, { quality: 'highestaudio' });
      ffmpeg(stream)
        .audioBitrate(128)
        .format('mp3')
        .save(outPath)
        .on('end', () => resolve(outPath))
        .on('error', err => reject(err));
    });
  }
};
