import { useState } from 'react';
export default function Home() {
  let [q, setQ] = useState('');
  let [res, setRes] = useState([]);
  async function doSearch() {
    let r = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    let j = await r.json();
    setRes(j.results);
  }
  return (
    <main style={{ padding: 20 }}>
      <h1>YouTube Video/Audio Downloader</h1>
      <input
        type="text"
        placeholder="search song..."
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <button onClick={doSearch}>Search</button>
      <ul>
        {res.map(v => (
          <li key={v.id} style={{ margin: '10px 0' }}>
            {v.title}
            {' '}<button onClick={() => window.open(`/api/download?id=${v.id}&format=mp4`)}>Video</button>
            {' '}<button onClick={() => window.open(`/api/download?id=${v.id}&format=mp3`)}>Audio</button>
          </li>
        ))}
      </ul>
    </main>
  );
    }
