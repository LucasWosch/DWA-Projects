import React, { useEffect } from 'react';
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
    const fetchTasks = useStore(state => state.fetchTasks);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div className={styles.columnContainer}>
            <h2 className={styles.columnTitle}>{title}</h2>
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} currentColumnId={id} />
            ))}
            <TaskForm columnId={id} />
        </div>
    );
};

export default Column;
