import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Task } from '../types/Task';
import styles from './Column.module.css';  // Ajuste o caminho do import se necessário

const TaskForm = ({ columnId }: { columnId: string }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const addTask = useStore(state => state.addTask);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;
        const newTask: Task = {
            _id: `task-${Math.random().toString(36).substr(2, 9)}`,
            id: `task-${Math.random().toString(36).substr(2, 9)}`, // Ensure both id and _id are set
            title,
            description,
        };
        addTask(newTask, columnId);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input
                type="text"
                className={styles.inputField}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task"
                required
            />
            <textarea
                className={styles.inputField}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description"
                required
            />
            <button type="submit" className={styles.addButton}>Add Task</button>
        </form>
    );
};

export default TaskForm;
