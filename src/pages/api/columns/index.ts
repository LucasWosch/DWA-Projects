import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Column from '../../../models/Column';
import Task from '../../../models/Task';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const columns = await Column.find({});
        const columnsWithTasks = await Promise.all(columns.map(async (column) => {
          const tasks = await Task.find({ _id: { $in: column.taskIds } });
          return {
            ...column.toObject(),
            tasks,
          };
        }));
        res.status(200).json({ success: true, data: columnsWithTasks });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case 'POST':
      try {
        const { id, title, taskIds } = req.body;
        const column = new Column({ _id: id, id, title, taskIds });
        await column.save();
        res.status(201).json({ success: true, data: column });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
      case 'DELETE':
        try {
          const { columnId } = req.body;
  
          // Encontrar a coluna
          const column = await Column.findOneAndDelete(
            { id: columnId });
          if (!column) {
            return res.status(404).json({ success: false, error: 'Column not found' });
          }
  
          // Deletar todas as tarefas associadas a essa coluna
          await Task.deleteMany({ _id: { $in: column.taskIds } });
  
          res.status(200).json({ success: true, data: column });
        } catch (error) {
          res.status(400).json({ success: false, error: error });
        }
        break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
