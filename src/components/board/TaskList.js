import React, { useState } from 'react';

import drag_n_drop from '../../helper/drag-n-drop.js';
import eventHandler from '../../helper/eventHandler.js'

export default function TaskList({ task, progressId, taskDropZone, ids, store }){
  // console.log("store", store)
  const { state: board, setState: setBoard } = store.board;

  return (
    <article className={`task prg-${store.progresses.state[progressId].id}-task-${store.tasks.state.id} drag-drop taskDropZone-${taskDropZone}`}>
      <section className="task-head">
        <div className="task-title">{store.tasks.state.title}</div>
        <button 
          name='task'
          className="btn-task-menu"
          onClick={(e)=>eventHandler.openModal(e, store, {...ids, task_id: task.id})}
        >···</button>
      </section>
      <section className="task-body">
        {task.description}
      </section>
    </article>
  )
}