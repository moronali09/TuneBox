import { deleteObject } from '../../utils/s3';
export default async (req, res) => {
  const { name } = req.body;
  await deleteObject(name);
  res.status(200).json({ ok: true });
};
