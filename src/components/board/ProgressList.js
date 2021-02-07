import React, { useState } from 'react';
import TaskList from './TaskList.js';

import sortObject from '../../helper/sortObject.js';

export default function ProgressList( { progress, tasks }){

  return (
    <article className={"progress" + " " + progress.id}>
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
      </section>
      <button className="btn-add-task"> + Add a task </button>
    </article>    
  )
}