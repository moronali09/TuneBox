import { listObjects } from '../../utils/s3';
export default async function handler(req, res) {
  const keys = await listObjects();
  res.status(200).json(keys);
}
