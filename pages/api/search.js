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
