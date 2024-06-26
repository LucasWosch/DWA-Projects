import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Column from '../../../models/Column';
import Task from '../../../models/Task';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'PUT':
      try {
        const { taskId, fromColumnId, toColumnId } = req.body;

        // Remover a tarefa da coluna de origem
        await Column.findOneAndUpdate(
          { id: fromColumnId },
          { $pull: { taskIds: taskId } }
        );

        // Adicionar a tarefa à coluna de destino
        await Column.findOneAndUpdate(
          { id: toColumnId },
          { $push: { taskIds: taskId } }
        );

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
