import React, { useState } from 'react';
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
    const [description, setDescription] = useState(task.description || "");
    const updateTaskDescription = useStore(state => state.updateTaskDescription);
    const columns = useStore(state => state.columns);
    const moveTask = useStore(state => state.moveTask);
    const removeTask = useStore(state => state.removeTask);

    const handleMoveTask = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newColumnId = e.target.value;
        await moveTask(task.id, currentColumnId, newColumnId);
    };

    const handleSaveDescription = async () => {
        await updateTaskDescription(task.id, description);
        setModalOpen(false); // Optionally close the modal on save
    };

    const handleRemoveTask = async () => {
        await removeTask(task.id, currentColumnId);
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{task.title}</h3>
            <button className={styles.showModalButton} onClick={() => setModalOpen(true)}>View</button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2>{task.title}</h2>
                <textarea
                    className={styles.textarea} // Adiciona a classe ao textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Edit description"
                ></textarea>
                <div className={styles.buttonContainer}>
                    <button 
                        className={styles.saveButton} // Adiciona a classe ao botão de salvar
                        onClick={handleSaveDescription}
                    >
                        Save Description
                    </button>
                </div>
                <select 
                    className={styles.selectField} // Certifique-se de ter essa classe definida para o select
                    value={currentColumnId} 
                    onChange={handleMoveTask}
                >
                    {columns.map(column => (
                        <option key={column.id} value={column.id}>{column.title}</option>
                    ))}
                </select>
            </Modal>
            <button className={styles.deleteButton} onClick={handleRemoveTask}>Delete</button>
        </div>
    );
};

export default TaskCard;
