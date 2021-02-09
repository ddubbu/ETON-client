import React, { useState } from 'react';

import drag_n_drop from '../../helper/drag-n-drop.js';

export default function TaskList({ task, progressId, taskDropZone }){
  return (
    <article className={`task prg-${progressId}-task-${task.id} drag-drop taskDropZone-${taskDropZone}`}>
      <section className="task-head">
        <div className="task-title">{task.title}</div>
        <button className="btn-task-menu">···</button>
      </section>
      <section className="task-body">
        {task.discription}
      </section>
    </article>
  )
}