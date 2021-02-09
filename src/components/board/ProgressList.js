import React, { useState } from 'react';
import TaskList from './TaskList.js';

import sortObject from '../../helper/sortObject.js';
import drag_n_drop from '../../helper/drag-n-drop.js';
import eventHandler from '../../helper/eventHandler.js'

export default function ProgressList( { progress, tasks, changePrgPriority, prg_priority, changeTaskPriority, 
                                        ids, store }){

  // clickAddProgress event - 함수 분리를 위해서
  const submitAddInfo = eventHandler.submitAddInfo('task');
  return (
    <article className={"progress" + " " + progress.id} 
      onMouseDown={drag_n_drop.handleMouseDown}
      onMouseUp={(e)=>{drag_n_drop.handleMouseUp(e, changePrgPriority, prg_priority, changeTaskPriority)}}
      onMouseMove={drag_n_drop.handleMouseMove}
      >
      <section className="progress-head drag-drop">
        <input className="progress-title" value={progress.title} onChange={(e)=>{
          eventHandler.inputChangeHandler(e, store, 'progress', progress.id)}}></input>
        <button 
          name='progress'
          className="btn-progress-menu"
          onClick={(e)=>eventHandler.openModal(e, store, {...ids, prg_id: progress.id})}
        >···</button>
      </section>
      <section className="progress-tasks-wrapper">
        {
          sortObject(tasks, progress.task_priority).map((task, idx)=>{
            return (
              <>
                <article className={`task-dropzone prg-${progress.id}-taskDropZone-${idx}`}></article>
                <TaskList 
                  taskDropZone={idx} 
                  task={task} 
                  progressId={progress.id}
                  ids={{...ids, prg_id: progress.id}}
                  store={store}
                  />
              </>
            )
          })
        }
        <article className={`task-dropzone prg-${progress.id}-taskDropZone-${progress.task_priority.split(',').length}`}></article>
      </section>

      {/* 누르기전까지 숨어 있음 */}
      <article className={`task prg-${progress.id} form-add-task`}>
        <input 
          name='title'
          className='form-add-task-input-title' 
          placeholder='Enter a title...'
          onChange={submitAddInfo()}
        ></input>
        <textarea 
          name='description'
          className='form-add-task-input-description' 
          placeholder='Enter a description...'
          onChange={submitAddInfo()}
        ></textarea>
        <button 
          className='form-add-task-btn-add'
          onClick={submitAddInfo}
        >Add Task</button>
        <button 
          className='form-add-task-btn-cancle'
          onClick={eventHandler.cancleAddInfo}
        >X</button>
      </article>
      <button 
        className="btn-add-task"
        onClick={(e)=>{eventHandler.clickAddSomething(e, 'task', progress.id)}}
      > + Add a task 
      </button>
    </article>    
  )
}