import create from 'zustand';
import { Task } from '../types/Task';
import { Column } from '../types/Column';

interface KanbanState {
    tasks: Task[];
    columns: Column[];
    fetchTasks: () => void;
    fetchColumns: () => void;
    addTask: (task: Task, columnId: string) => void;
    removeTask: (taskId: string, columnId: string) => void;
    moveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
    updateTaskDescription: (taskId: string, description: string) => void;
    addColumn: (title: string) => void;
    deleteColumn: (columnId: string) => void;
}

export const useStore = create<KanbanState>((set) => ({
    tasks: [],
    columns: [],
    fetchTasks: async () => {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        if (data.success) {
            set({ tasks: data.data });
        }
    },
    fetchColumns: async () => {
        const res = await fetch('/api/columns');
        const data = await res.json();
        if (data.success) {
            const tasks = data.data.flatMap((column: any) => column.tasks);
            const columns = data.data.map((column: any) => ({
                id: column.id,
                title: column.title,
                taskIds: column.taskIds,
            }));
            set({ columns, tasks });
        }
    },
    addTask: async (task, columnId) => {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...task, columnId }),
        });
        const data = await res.json();
        if (data.success) {
            set((state) => {
                const updatedColumns = state.columns.map(column => {
                    if (column.id === columnId) {
                        return { ...column, taskIds: [...column.taskIds, data.data.id] };
                    }
                    return column;
                });
                return { tasks: [...state.tasks, data.data], columns: updatedColumns };
            });
        }
    },
    removeTask: async (taskId, columnId) => {
        const res = await fetch(`/api/tasks/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId, columnId }),
        });
        const data = await res.json();
        if (data.success) {
            set((state) => {
                const updatedColumns = state.columns.map(column => {
                    if (column.id === columnId) {
                        return { ...column, taskIds: column.taskIds.filter(id => id !== taskId) };
                    }
                    return column;
                });
                return { tasks: state.tasks.filter(task => task.id !== taskId), columns: updatedColumns };
            });
        }
    },
    moveTask: async (taskId, fromColumnId, toColumnId) => {
        const res = await fetch('/api/tasks/move', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId, fromColumnId, toColumnId }),
        });
        const data = await res.json();
        if (data.success) {
            set(state => {
                const fromColumn = state.columns.find(column => column.id === fromColumnId);
                const toColumn = state.columns.find(column => column.id === toColumnId);

                if (!fromColumn || !toColumn) {
                    return state;
                }

                const newFromTaskIds = fromColumn.taskIds.filter(id => id !== taskId);
                const newToTaskIds = [...toColumn.taskIds, taskId];

                const newColumns = state.columns.map(column => {
                    if (column.id === fromColumnId) {
                        return { ...column, taskIds: newFromTaskIds };
                    } else if (column.id === toColumnId) {
                        return { ...column, taskIds: newToTaskIds };
                    }
                    return column;
                });

                return { ...state, columns: newColumns };
            });
        }
    },
    updateTaskDescription: async (taskId, description) => {
        const res = await fetch(`/api/tasks/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId, description }),
        });
        const data = await res.json();
        if (data.success) {
            set(state => ({
                tasks: state.tasks.map(task => 
                    task.id === taskId ? { ...task, description: description } : task
                )
            }));
        }
    },
    addColumn: async (title) => {
        const newColumn = {
            _id: `col-${Math.random().toString(36).substr(2, 9)}`, // Use _id para o MongoDB
            id: `col-${Math.random().toString(36).substr(2, 9)}`, // Ensure both id and _id are set
            title,
            taskIds: []
        };
        const res = await fetch('/api/columns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newColumn),
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({
                columns: [...state.columns, data.data]
            }));
        }
    },
    deleteColumn: async (columnId) => {
        const res = await fetch(`/api/columns/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ columnId }),
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({
                columns: state.columns.filter(column => column.id !== columnId),
                tasks: state.tasks.filter(task => !data.data.taskIds.includes(task.id)),
            }));
        }
    },
}));
