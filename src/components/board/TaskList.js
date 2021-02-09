import React, { useState } from 'react';

import drag_n_drop from '../../helper/drag-n-drop.js';
import eventHandler from '../../helper/eventHandler.js'

export default function TaskList({ taskDropZone, ids, store }){

  const { state: board, setState: setBoard } = store.board;
  const { state: progresses, setState: setProgresses } = store.progresses;
  const { state: tasks, setState: setTasks } = store.tasks;
  const progress = progresses[ids.progress_id];
  const task = tasks[ids.task_id];

  return (
    <article className={`task prg-${ids.progress_id}-task-${ids.task_id} drag-drop taskDropZone-${taskDropZone}`}>
      <section className="task-head">
        <div className="task-title">{task.title}</div>
        <button 
          name='task'
          className="btn-task-menu"
          onClick={(e)=>eventHandler.openModal(e, store, ids)}
        >···</button>
      </section>
      <section className="task-body">
        {task.description}
      </section>
    </article>
  )
}