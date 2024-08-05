import React, { useContext, useState } from 'react';
import './ItemTask.css';
import { taskContext } from '../Context/Context';

export const ItemTask = ({ idTask, titleTask, content }) => {
  const { tasks, updateTaskStatus, deleteTask, editTask } = useContext(taskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(titleTask);
  const [newContent, setNewContent] = useState(content);

  const task = tasks.find(task => task.id === idTask);

  const handleCheckboxChange = () => {
    updateTaskStatus(idTask, !task.status);
  };

  const handleDelete = () => {
    deleteTask(idTask);
  };

  const handleEdit = () => {
    if (isEditing) {
      editTask(idTask, { title: newTitle, description: newContent });
    }
    setIsEditing(!isEditing);
  };

  return (
    <li id={idTask} className={task.status ? 'item-task checked' : 'item-task'}>
      <div className={task.status ? 'circle-state circle-green' : 'circle-state'}></div>
      {isEditing ? (
        <div className="edit-container">
          <input
            type='text'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder='Edit title'
          />
          <input
            type='text'
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder='Edit content'
          />
        </div>
      ) : (
        <>
          <h2>{titleTask}</h2>
          <p>{content}</p>
        </>
      )}
      <input type="checkbox" checked={task.status} onChange={handleCheckboxChange} />
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};
