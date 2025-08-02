import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [list, setList] = useState([]);
  const [file, setFile] = useState(null);

  const fetchList = async () => {
    const res = await axios.get('/api/list');
    setList(res.data);
  };

  useEffect(fetchList, []);

  const upload = async () => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    await axios.post('/api/upload', form);
    setFile(null);
    fetchList();
  };

  const remove = async (name) => {
    await axios.post('/api/delete', { name });
    fetchList();
  };

  const download = (name) => {
    window.open(`/api/download?name=${encodeURIComponent(name)}`);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>File Manager</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
      <ul>
        {list.map(item => (
          <li key={item}>
            {item}
            <button onClick={() => download(item)}>Download</button>
            <button onClick={() => remove(item)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
