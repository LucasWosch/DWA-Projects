'use client';

import React, { useEffect, useState } from 'react';
import styles from './KanbanBoard.module.css';
import Column from './Column';  // Ajuste o caminho se necessário
import { useStore } from '../store/useStore';

const KanbanBoard: React.FC = () => {
    const columns = useStore(state => state.columns);
    const fetchColumns = useStore(state => state.fetchColumns);
    const addColumn = useStore(state => state.addColumn);
    const [newColumnTitle, setNewColumnTitle] = useState('');

    useEffect(() => {
        fetchColumns(); // Busca as colunas e tasks ao montar o componente
    }, [fetchColumns]);

    const handleAddColumn = () => {
        if (newColumnTitle.trim() !== '') {
            addColumn(newColumnTitle);
            setNewColumnTitle('');
        }
    };

    return (
        <div className={styles.kanbanContainer}>
            <div className={styles.boardContainer}>
                {columns.map(column => (
                    <Column key={column.id} id={column.id} title={column.title} taskIds={column.taskIds} />
                ))}
                <div className={styles.addColumnContainer}>
                    <input
                        type="text"
                        value={newColumnTitle}
                        onChange={(e) => setNewColumnTitle(e.target.value)}
                        placeholder="New column title"
                        className={styles.addColumnInput}
                    />
                    <button onClick={handleAddColumn} className={styles.addColumnButton}>
                        Add Column
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KanbanBoard;
