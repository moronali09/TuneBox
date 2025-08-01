import ytsr from 'ytsr';

export default async function handler(req, res) {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Missing query' });

    const filters = await ytsr.getFilters(q);
    const filter = filters.get('Type').get('Video');
    const searchResults = await ytsr(filter.url, { limit: 5 });

    const results = searchResults.items.map(video => ({
      id: video.id,
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnails?.[0]?.url || ''
    }));

    res.status(200).json({ results });
  } catch (err) {
    console.error('Search Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
