'use client';

import React from 'react';
import styles from './KanbanBoard.module.css';
import Column from './Column';  // Ajuste o caminho se necessário
import { useStore } from '../store/useStore';

const KanbanBoard: React.FC = () => {
    const columns = useStore(state => state.columns); // Supondo que você tem uma estrutura de colunas

    return (
        <div className={styles.boardContainer}>
            {columns.map(column => (
                <Column key={column.id} title={column.title} taskIds={column.taskIds} />
            ))}
        </div>
    );
};

export default KanbanBoard;
