import { IncomingForm } from 'formidable-serverless';
import fs from 'fs-extra';
import { STORAGE } from '../../utils/storage';
export const config = { api: { bodyParser: false } };
export default async (req, res) => {
  const form = new IncomingForm({ uploadDir: '/tmp' });
  form.parse(req, async (err, fields, files) => {
    const file = files.file;
    await fs.move(file.filepath, `${STORAGE}/${file.originalFilename}`, { overwrite: true });
    res.status(200).json({ ok: true });
  });
};
