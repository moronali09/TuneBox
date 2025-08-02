import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [list, setList] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  
  const fetchList = async () => {
    const res = await axios.get('/api/list');
    setList(res.data);
  };

  useEffect(() => { fetchList(); }, []);

  const upload = async () => {
    if (!file) return;
    const form = new FormData(); form.append('file', file);
    await axios.post('/api/upload', form);
    setFile(null); fetchList();
  };

  const createFolder = async () => {
    const n = prompt('Folder name');
    if (n) await axios.post('/api/create-folder', { name: n });
    fetchList();
  };

  const createFile = async () => {
    const n = prompt('File name');
    if (n) await axios.post('/api/create-file', { name: n, content: '' });
    fetchList();
  };

  const remove = async (name) => {
    if (confirm(`Delete ${name}?`)) {
      await axios.post('/api/delete', { name }); fetchList();
    }
  };

  const rename = async (oldName) => {
    const nw = prompt('New name', oldName);
    if (nw) await axios.post('/api/rename', { oldName, newName: nw });
    fetchList();
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>File Manager</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
      <button onClick={createFolder}>New Folder</button>
      <button onClick={createFile}>New File</button>
      <ul>
        {list.map(item => (
          <li key={item.name}>
            {item.name}{item.isDirectory? '/' : ''}
            <button onClick={() => remove(item.name)}>Delete</button>
            <button onClick={() => rename(item.name)}>Rename</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
