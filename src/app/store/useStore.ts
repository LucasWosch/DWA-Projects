/*

// src/store/useStore.ts
import create from 'zustand';
import { Task } from '../types/Task';  // Importar Task e Column
import { Column } from '../types/Column';  // Importar Task e Column

interface KanbanState {
    tasks: Task[];
    columns: Column[];
    addTask: (task: Task) => void;
    removeTask: (taskId: string) => void;
    addColumn: (column: Column) => void;
}

export const useStore = create<KanbanState>((set) => ({
    tasks: [],
    columns: [],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    removeTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
    })),
    addColumn: (column) => set((state) => ({ columns: [...state.columns, column] })),
}));

*/

// src/store/useStore.ts
import create from 'zustand';
import { Task } from '../types/Task';  // Importar Task e Column
import { Column } from '../types/Column';  // Importar Task e Column

interface KanbanState {
    tasks: Task[];
    columns: Column[];
    addTask: (task: Task) => void;
    removeTask: (taskId: string) => void;
    addColumn: (column: Column) => void;
}

export const useStore = create<KanbanState>((set) => ({
    tasks: [
        { id: 'task-1', title: 'Task 1', description: 'Description of Task 1' },
        { id: 'task-2', title: 'Task 2', description: 'Description of Task 2' }
    ],
    columns: [
        { id: 'col-1', title: 'Todo', taskIds: ['task-1', 'task-2'] },
        { id: 'col-1', title: 'Todo', taskIds: ['task-1', 'task-2'] },
        { id: 'col-1', title: 'Todo', taskIds: ['task-1', 'task-2'] }
    ],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    removeTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
    })),
    addColumn: (column) => set((state) => ({ columns: [...state.columns, column] })),
}));
