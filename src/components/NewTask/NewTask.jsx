
import { v4 as uuidv4 } from 'uuid';
import './NewTask.css'
import React, { useContext, useRef, useState } from 'react';
import { taskContext } from '../Context/Context';



export const NewTask = () => {
  const context = useContext(taskContext)
  const [titleTask, setTitleTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');
  const txtTitle = useRef('');
  const txtDescription = useRef('');

  const handleTitleTask = (event) => setTitleTask(event.target.value)
  const handleDescriptionTask = (event) => setDescriptionTask(event.target.value)

  const handleCreateTask = (event) => {
    event.preventDefault();
    const newTask = {
      id: uuidv4(),
      title: titleTask,
      description: descriptionTask,
      status: false,
    }
    context.setTasks([...context.tasks, newTask])
    context.setFilteredTasks([...context.tasks, newTask])

    txtTitle.current.value = ''
    txtDescription.current.value = ''

  }
  return (
    <form className='frm-task'>
      <fieldset>
        <label> Titulo de la tarea </label>
        <input ref={txtTitle} onChange={handleTitleTask} id='txt-title' placeholder='Título de la tarea' type='text' />
      </fieldset>
      <fieldset>
        <label> Descripción de la tarea </label>
        <input ref={txtDescription} onChange={handleDescriptionTask} id='txt-description' placeholder='Descripción de la tarea' type='text' maxLength={100} />
      </fieldset>
      <button onClick={handleCreateTask} className='btn-new-task'>Agregar tarea</button>
    </form>




  )
}





