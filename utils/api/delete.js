import fs from 'fs-extra';
import { STORAGE } from '../../utils/storage';
export default async (req, res) => {
  const { name } = req.body;
  await fs.remove(`${STORAGE}/${name}`);
  res.status(200).json({ ok: true });
};
