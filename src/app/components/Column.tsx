import React from 'react';
import styles from './Column.module.css';
import { useStore } from '../store/useStore';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

interface ColumnProps {
  title: string;
  taskIds: string[];
  id: string;  // Certifique-se de passar o id da coluna
}

const Column: React.FC<ColumnProps> = ({ title, taskIds, id }) => {
  const tasks = useStore(state => state.tasks.filter(task => taskIds.includes(task.id)));
  const deleteColumn = useStore(state => state.deleteColumn);

  const handleDeleteColumn = async () => {
    await deleteColumn(id);
  };

  return (
    <div className={styles.columnContainer}>
      <h2 className={styles.columnTitle}>{title}</h2>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} currentColumnId={id} />
      ))}
      <TaskForm columnId={id} />
      <button className={styles.deleteColumnButton} onClick={handleDeleteColumn}>Deletar Coluna</button>
    </div>
  );
};

export default Column;
