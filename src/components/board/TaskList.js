import React, { useState } from 'react';

export default function TaskList({ task }){
  return (
    <article className={`task ${task.id} drag-drop`}>
      <section className="task-head">
        <div className="task-title">{task.title}</div>
        <button className="btn-task-menu">···</button>
      </section>
      <section className="task-body">
        task 내용입니다. 나중에 description, member 적용할 것임.
      </section>
    </article>
  )
}