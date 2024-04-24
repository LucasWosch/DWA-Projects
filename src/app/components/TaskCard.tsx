import React, {useState} from 'react';
import styles from './TaskCard.module.css';
import { Task } from '../types/Task';
import { useStore } from '../store/useStore'; // Ajuste o caminho conforme necessário
import Modal from './Modal';

interface TaskCardProps {
    task: Task;
    currentColumnId: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, currentColumnId }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const columns = useStore(state => state.columns);
    const moveTask = useStore(state => state.moveTask);
    const removeTask = useStore(state => state.removeTask);

    const handleMoveTask = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newColumnId = e.target.value;
        moveTask(task.id, currentColumnId, newColumnId);
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{task.title}</h3>
            <button className={styles.showModalButton} onClick={() => setModalOpen(true)}>View</button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2>{task.title}</h2>
                <p>{task.description || "No description provided."}</p>
                <select value={currentColumnId} onChange={handleMoveTask}>
                    {columns.map(column => (
                        <option key={column.id} value={column.id}>{column.title}</option>
                    ))}
                </select>
            </Modal>
            <button className={styles.deleteButton} onClick={() => removeTask(task.id)}>Delete</button>
        </div>
    );
};

export default TaskCard;
