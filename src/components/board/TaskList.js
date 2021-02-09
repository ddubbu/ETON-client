import React, { useState } from 'react';

import drag_n_drop from '../../helper/drag-n-drop.js';
import eventHandler from '../../helper/eventHandler.js'

export default function TaskList({ task, progressId, taskDropZone,
                                   modals, setModals, ids }){
  return (
    <article className={`task prg-${progressId}-task-${task.id} drag-drop taskDropZone-${taskDropZone}`}>
      <section className="task-head">
        <div className="task-title">{task.title}</div>
        <button 
          name='task'
          className="btn-task-menu"
          onClick={(e)=>eventHandler.openModal(e, modals, setModals, {...ids, task_id: task.id})}
        >···</button>
      </section>
      <section className="task-body">
        {task.description}
      </section>
    </article>
  )
}