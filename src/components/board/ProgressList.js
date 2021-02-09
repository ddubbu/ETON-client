import React, { useState } from 'react';
import TaskList from './TaskList.js';

import sortObject from '../../helper/sortObject.js';
import drag_n_drop from '../../helper/drag-n-drop.js';
import eventHandler from '../../helper/eventHandler.js'

export default function ProgressList( { progress, tasks, changePrgPriority, prg_priority, changeTaskPriority, inputChangeHandler }){

  // clickAddProgress event - 함수 분리를 위해서
  const clickAddHandler = eventHandler.add_progress_or_task('task');

  return (
    <article className={"progress" + " " + progress.id} 
      onMouseDown={drag_n_drop.handleMouseDown}
      onMouseUp={(e)=>{drag_n_drop.handleMouseUp(e, changePrgPriority, prg_priority, changeTaskPriority)}}
      onMouseMove={drag_n_drop.handleMouseMove}
      >
      <section className="progress-head drag-drop">
        <input className="progress-title" value={progress.title} onChange={(e)=>{inputChangeHandler(e, 'progress', progress.id)}}></input>
        <button className="btn-progress-menu">···</button>
      </section>
      <section className="progress-tasks-wrapper">
        {
          sortObject(tasks, progress.task_priority).map((task, idx)=>{
            return (
              <>
                <article className={`task-dropzone prg-${progress.id}-taskDropZone-${idx}`}></article>
                <TaskList taskDropZone={idx} task={task} progressId={progress.id}/>
              </>
            )
          })
        }
        <article className={`task-dropzone prg-${progress.id}-taskDropZone-${progress.task_priority.split(',').length}`}></article>
      </section>

      {/* 누르기전까지 숨어 있음 */}
      <article className={`task task-${progress.id} form-add-task`}>
        <input 
          name='title'
          className='form-add-task-input-title' 
          placeholder='Enter a title...'
          onChange={clickAddHandler()}
        ></input>
        <textarea 
          name='description'
          className='form-add-task-input-description' 
          placeholder='Enter a description...'
          onChange={clickAddHandler()}
        ></textarea>
        <button 
          className='form-add-task-btn-add'
          onClick={clickAddHandler}
        >Add Task</button>
        <button className='form-add-task-btn-cancle'>X</button>
      </article>
      <button 
        className="btn-add-task"
        onClick={(e)=>{
          const $form_add_progress = document.querySelector(`.form-add-task.task-${progress.id}`);
          // 위에서 아래로 생기는 action은 나중에
          $form_add_progress.style.display = 'flex'
          e.target.style.display = 'none'
        }}
      > + Add a task 
      </button>
    </article>    
  )
}