import ytdl from 'ytdl-core';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const { id, format } = req.query;
  if (!id || !format) return res.status(400).send('Missing id or format');
  const info = await ytdl.getInfo(id);
  res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.${format}"`);
  if (format === 'mp4') {
    ytdl(id, { quality: 'highestvideo' }).pipe(res);
  } else if (format === 'mp3') {
    const stream = ytdl(id, { quality: 'highestaudio' });
    ffmpeg(stream)
      .setFfmpegPath(ffmpegPath)
      .format('mp3')
      .audioBitrate(128)
      .pipe(res, { end: true });
  } else {
    res.status(400).send('Invalid format');
  }
}
