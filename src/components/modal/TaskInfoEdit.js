import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import eventHandler from '../../helper/eventHandler'

export default function TaskInfoEdit ({store}){

  // global state
  const { state: tasks, setState: setTasks } = store.tasks;
  const { state: event, setState: setEvent } = store.event;
  const { board_id: b, progress_id: p, task_id: t } = event;

  // local state  
  const [ input, setInput ] = useState({
    title: tasks[t].title,
    description: tasks[t].description
  })

  const inputChangeHandler = async (e)=>{
    await setInput({
      [e.target.name] : e.target.value
    })    
  }

  return(
    ReactDOM.createPortal( // $(.App) component 와 별개로 스타일 적용하고 싶을 때, Modal에서 주로 사용될 듯
      <section id="task-edit-form-wrapper" >
        <section id="task-edit-form">
          <input name="title" placeholder="제목" value={input.title}
            onChange={inputChangeHandler}
          ></input>
          <textarea name="description" placeholder="내용" value={input.description}
            onChange={inputChangeHandler}
          ></textarea>
          <button name="task_edit" onClick={(e)=>eventHandler.submitModifyTask(e, store, input)}>save</button>
          <button name="task_edit" onClick={(e)=>eventHandler.toggleModal(e, store)}>cancle</button>
        </section>
      </section>,

      document.querySelector('.App')
    )
  )
}