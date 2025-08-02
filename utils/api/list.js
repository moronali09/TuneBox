import { promises as fs } from 'fs';
import { STORAGE } from '../../utils/storage';
export default async function handler(req, res) {
  const names = await fs.readdir(STORAGE);
  const entries = await Promise.all(names.map(async name => {
    const stat = await fs.stat(`${STORAGE}/${name}`);
    return { name, isDirectory: stat.isDirectory() };
  }));
  res.status(200).json(entries);
}
