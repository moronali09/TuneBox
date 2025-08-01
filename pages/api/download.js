import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Missing video ID' });

    const info = await ytdl.getInfo(id);

    // audio-only formats
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    if (!audioFormats || audioFormats.length === 0) {
      return res.status(404).json({ error: 'No audio format found' });
    }

    const bestAudio = audioFormats[0]; // usually highest bitrate
    return res.status(200).json({
      title: info.videoDetails.title,
      audioUrl: bestAudio.url
    });

  } catch (err) {
    console.error('Audio fetch error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
