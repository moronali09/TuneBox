import { IncomingForm } from 'formidable-serverless';
import { uploadObject } from '../../utils/s3';
export const config = { api: { bodyParser: false } };
export default async (req, res) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const file = files.file;
    const data = await fs.promises.readFile(file.filepath);
    await uploadObject(file.originalFilename, data);
    res.status(200).json({ ok: true });
  });
};
