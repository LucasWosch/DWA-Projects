import React from 'react';
import styles from './Column.module.css';
import { useStore } from '../store/useStore';
import TaskCard from './TaskCard';
import { Task } from '../types/Task';

interface ColumnProps {
    title: string;
    taskIds: string[]; // Lista de IDs de tarefas nesta coluna
}

const Column: React.FC<ColumnProps> = ({ title, taskIds }) => {
    const tasks = useStore(state => state.tasks.filter(task => taskIds.includes(task.id)));

    return (
        <div className={styles.columnContainer}>
            <h2 className={styles.columnTitle}>{title}</h2>
            {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
    );
};

export default Column;
