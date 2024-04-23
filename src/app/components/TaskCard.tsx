import React from 'react';
import styles from './TaskCard.module.css';
import { Task } from '../types/Task';
import { useStore } from '../store/useStore'; // Ajuste o caminho conforme necessário

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const removeTask = useStore(state => state.removeTask);

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{task.title}</h3>
            <button className={styles.deleteButton} onClick={() => removeTask(task.id)}>Delete</button>
        </div>
    );
};

export default TaskCard;
