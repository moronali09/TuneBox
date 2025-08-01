import ytsr from 'ytsr';
export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'No query' });
  const filters = await ytsr.getFilters(q);
  const filter = filters.get('Type').get('Video');
  const searchResults = await ytsr(filter.url, { limit: 5 });
  const items = searchResults.items.map(item => ({
    id: item.id,
    title: item.title,
    url: item.url
  }));
  res.status(200).json({ results: items });
}

// pages/api/download.js
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
