// src/types/Column.ts
export interface Column {
    _id: string;
    id: string;
    title: string;
    taskIds: string[];  // Lista de IDs de tarefas nesta coluna
}
