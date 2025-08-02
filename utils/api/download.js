import { getObjectStream } from '../../utils/s3';
export default async function handler(req, res) {
  const { name } = req.query;
  const stream = getObjectStream(name);
  res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
  stream.pipe(res);
}
