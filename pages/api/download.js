import ytdl from 'ytdl-core';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { id, format } = req.query;
  if (!id || !format) return res.status(400).send('Missing id or format');

  try {
    const info = await ytdl.getInfo(id);
    const title = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_');

    res.setHeader('Content-Disposition', `attachment; filename="${title}.${format}"`);

    if (format === 'mp4') {
      ytdl(id, { quality: 'highestvideo' }).pipe(res);
    } else if (format === 'mp3') {
      const stream = ytdl(id, { quality: 'highestaudio' });

      ffmpeg(stream)
        .setFfmpegPath(ffmpegPath)
        .format('mp3')
        .audioBitrate(128)
        .on('error', (err) => {
          console.error('FFmpeg Error:', err);
          res.status(500).send('FFmpeg processing failed');
        })
        .pipe(res, { end: true });

    } else {
      res.status(400).send('Invalid format');
    }
  } catch (err) {
    console.error('Download Error:', err);
    res.status(500).send('Internal Server Error');
  }
}
