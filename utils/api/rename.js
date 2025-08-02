import fs from 'fs-extra';
import { STORAGE } from '../../utils/storage';
export default async (req, res) => {
  const { oldName, newName } = req.body;
  await fs.move(`${STORAGE}/${oldName}`, `${STORAGE}/${newName}`);
  res.status(200).json({ ok: true });
};
