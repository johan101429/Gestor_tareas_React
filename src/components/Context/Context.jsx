import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const taskContext = createContext();

const initialTasks = [
  { id: uuidv4(), title: 'Tarea de ejemplo 1', description: 'Descripción pendiente1', status: false },
  { id: uuidv4(), title: 'Tarea de ejemplo 2', description: 'Descripción pendiente2', status: true },
  { id: uuidv4(), title: 'Tarea de ejemplo 3', description: 'Descripción pendiente3', status: true }
];

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);

  // Función para actualizar el estado de una tarea
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    setFilteredTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  // Función para editar una tarea
  const editTask = (taskId, updatedData) => {
    const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, ...updatedData } : task);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  return (
    <taskContext.Provider value={{
      tasks,
      setTasks,
      filteredTasks,
      setFilteredTasks,
      updateTaskStatus,
      deleteTask,
      editTask,
      pendingTasks,
      setPendingTasks,
      doneTasks,
      setDoneTasks
    }}>
      {children}
    </taskContext.Provider>
  );
};
