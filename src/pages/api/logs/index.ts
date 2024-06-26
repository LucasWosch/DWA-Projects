import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import AccessLog from '../../../models/AccessLog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { email } = req.body;
        const log = new AccessLog({ email, accessTime: new Date() });
        await log.save();
        res.status(201).json({ success: true, data: log });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
