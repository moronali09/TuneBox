import fs from 'fs-extra';
import { STORAGE } from '../../utils/storage';
export default async (req, res) => {
  const { name, content } = req.body;
  await fs.outputFile(`${STORAGE}/${name}`, content);
  res.status(200).json({ ok: true });
};
