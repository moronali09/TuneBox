import fs from 'fs-extra';
import { resolve } from '../../utils/storage';

export default async function handler(req, res) {
  const { name } = req.query;
  const filePath = resolve(name);
  try {
    await fs.access(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.send(await fs.readFile(filePath));
  } catch (e) {
    res.status(404).json({ error: 'File not found' });
  }
}
