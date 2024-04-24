import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Task } from '../types/Task';
import styles from './Column.module.css';  // Ajuste o caminho do import se necessário

const TaskForm = ({ columnId }: { columnId: string }) => {
    const [title, setTitle] = useState('');
    const addTask = useStore(state => state.addTask);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;
        const newTask: Task = {
            id: Date.now().toString(),
            title: title
        };
        addTask(newTask, columnId);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input
                type="text"
                className={styles.inputField}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task"
            />
            <button type="submit" className={styles.addButton}>Add Task</button>
        </form>
    );
};

export default TaskForm;
