import React, { useState } from 'react';
import TaskList from './TaskList.js';

import sortObject from '../../helper/sortObject.js';
import drag_n_drop from '../../helper/drag-n-drop.js';
import eventHandler from '../../helper/eventHandler.js'

export default function ProgressList( { store, ids }){
  const { state: board, setState: setBoard } = store.board;
  const { state: progresses, setState: setProgresses } = store.progresses;
  const { state: tasks, setState: setTasks } = store.tasks;
  const progress = progresses[ids.progress_id]

  // clickAddProgress event - 함수 분리를 위해서
  const submitAddInfo = eventHandler.submitAddInfo('task');
  return (
    <article className={"progress" + " " + progress.id} 
      onMouseDown={drag_n_drop.handleMouseDown}
      onMouseUp={(e)=>{drag_n_drop.handleMouseUp(e, store, ids)}}
      onMouseMove={drag_n_drop.handleMouseMove}
      >
      <section className="progress-head drag-drop">
        <input className="progress-title" value={progress.title} onChange={(e)=>{
          eventHandler.titleModifyHandler(e, store, 'progress', progress.id)}}></input>
        <button 
          name='progress'
          className="btn-progress-menu"
          onClick={(e)=>eventHandler.toggleModal(e, store, ids)} //{...ids, prg_id: progress.id}
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
                  ids={{...ids, task_id: task.id}}
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