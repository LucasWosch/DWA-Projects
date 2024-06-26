import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Task from '../../../models/Task';
import Column from '../../../models/Column';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, data: tasks });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case 'POST':
      try {
        const { id, title, description, columnId } = req.body;
        const task = new Task({ _id: id, id, title, description });
        await task.save();

        // Verificar se a coluna existe antes de atualizar
        const column = await Column.findOneAndUpdate(
          { id: columnId },
          { $push: { taskIds: task.id } },
          { new: true, useFindAndModify: false }
        );
        if (!column) {
          return res.status(404).json({ success: false, error: 'Column not found' });
        }

        res.status(201).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case 'PUT':
      try {
        const { taskId, description } = req.body;
        const task = await Task.findByIdAndUpdate(
          taskId,
          { description },
          { new: true }
        );
        if (!task) {
          return res.status(404).json({ success: false, error: 'Task not found' });
        }

        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case 'DELETE':
      try {
        const { taskId, columnId } = req.body;

        // Remover a tarefa
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
          return res.status(404).json({ success: false, error: 'Task not found' });
        }

        // Remover a tarefa da coluna correspondente
        await Column.findOneAndUpdate(
          { id: columnId },
          { $pull: { taskIds: taskId } },
          { new: true, useFindAndModify: false }
        );

        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
