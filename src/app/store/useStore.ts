
// src/store/useStore.ts
import create from 'zustand';
import { Task } from '../types/Task';  // Importar Task e Column
import { Column } from '../types/Column';  // Importar Task e Column

interface KanbanState {
    tasks: Task[];
    columns: Column[];
    addTask: (task: Task, columnId: string) => void;
    removeTask: (taskId: string) => void;
    addColumn: (column: Column) => void;
    moveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
}

export const useStore = create<KanbanState>((set) => ({
    tasks: [
    ],
    columns: [
        { id: 'col-1', title: 'A fazer', taskIds: [] },
        { id: 'col-2', title: 'Fazendo', taskIds: [] },
        { id: 'col-3', title: 'Concluida', taskIds: [] }
    ],
    addTask: (task, columnId) => set((state) => {
        const updatedColumns = state.columns.map(column => {
            if (column.id === columnId) {
                return { ...column, taskIds: [...column.taskIds, task.id] };
            }
            return column;
        });
        return { tasks: [...state.tasks, task], columns: updatedColumns };
    }),
    removeTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
    })),
    addColumn: (column) => set((state) => ({ columns: [...state.columns, column] })),
    moveTask: (taskId, fromColumnId, toColumnId) => set(state => {
        // Encontrar as colunas de origem e destino
        const fromColumn = state.columns.find(column => column.id === fromColumnId);
        const toColumn = state.columns.find(column => column.id === toColumnId);

        if (!fromColumn || !toColumn) {
            // Se uma das colunas não for encontrada, retorne o estado atual sem mudanças
            return state;
        }

        // Remover taskId da coluna de origem e adicionar na coluna de destino
        const newFromTaskIds = fromColumn.taskIds.filter(id => id !== taskId);
        const newToTaskIds = [...toColumn.taskIds, taskId];

        // Criar novas colunas com a atualização das tarefas
        const newColumns = state.columns.map(column => {
            if (column.id === fromColumnId) {
                return { ...column, taskIds: newFromTaskIds };
            } else if (column.id === toColumnId) {
                return { ...column, taskIds: newToTaskIds };
            }
            return column;
        });

        // Retornar o novo estado com as colunas atualizadas
        return { ...state, columns: newColumns };
    }),
}));
