import React, { useState } from 'react';
import TaskList from './TaskList.js';

import sortObject from '../../helper/sortObject.js';
import drag_n_drop from '../../helper/drag-n-drop.js';

export default function ProgressList( { progress, tasks }){

  return (
    <article className={"progress" + " " + progress.id} 
      onMouseDown={drag_n_drop.handleMouseDown}
      onMouseUp={drag_n_drop.handleMouseUp}
      onMouseMove={drag_n_drop.handleMouseMove}
      // 아래는 투명해
      // onDrag={drag_n_drop.drag_handler}
      // draggable='true'
      >
      <section className="progress-head drag-drop">
        <input className="progress-title" value={progress.title}></input>
        <button className="btn-progress-menu">···</button>
      </section>
      <section className="progress-tasks-wrapper">
        {
          sortObject(tasks, progress.task_priority).map((task, idx)=>{
            return <TaskList key={idx} task={task}/>
          })
        }
        <artice className={`task-dropzone prpgress-${1}-dropzone-${3}`}></artice>
      </section>
      <button className="btn-add-task"> + Add a task </button>
    </article>    
  )
}