import React, { useState } from 'react';
import TaskList from './TaskList.js';

import sortObject from '../../helper/sortObject.js';
import drag_n_drop from '../../helper/drag-n-drop.js';

export default function ProgressList( { progress, tasks, changePrgPriority, prg_priority, changeTaskPriority }){

  console.log("ProgressList with ", progress)
  console.log("progress.task_priority", progress.task_priority)
  return (
    <article className={"progress" + " " + progress.id} 
      onMouseDown={drag_n_drop.handleMouseDown}
      onMouseUp={(e)=>{drag_n_drop.handleMouseUp(e, changePrgPriority, prg_priority, changeTaskPriority)}}
      onMouseMove={drag_n_drop.handleMouseMove}
      >
      <section className="progress-head drag-drop">
        <input className="progress-title" value={progress.title}></input>
        <button className="btn-progress-menu">···</button>
      </section>
      <section className="progress-tasks-wrapper">
        {
          sortObject(tasks, progress.task_priority).map((task, idx)=>{
            // console.log(task)
            return (
              <>
                <article className={`task-dropzone prg-${progress.id}-taskDropZone-${idx}`}></article>
                <TaskList key={idx} task={task} progressId={progress.id}/>
              </>
            )
          })
        }
        <article className={`task-dropzone prg-${progress.id}-taskDropZone-${progress.task_priority.split(',').length}`}></article>
      </section>
      <button className="btn-add-task"> + Add a task </button>
    </article>    
  )
}