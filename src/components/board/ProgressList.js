import React, { useEffect, useState } from 'react';
import TaskList from './TaskList.js';

import sortObject from '../../helper/sortObject.js';
import drag_n_drop from '../../helper/drag-n-drop.js';
import eventHandler from '../../helper/eventHandler.js'

export default function ProgressList( { store, ids }){
  const { state: board, setState: setBoard } = store.board;
  const { state: progresses, setState: setProgresses } = store.progresses;
  const { state: tasks, setState: setTasks } = store.tasks;
  const { state: event, setState: setEvent } = store.event;
  const progress = progresses[ids.progress_id];

  //! 여기서부터 progress 추가 코드
  // local state
  const [input, setInput] = useState({
    title: '',
    description: ''
  })

  const [newTaskId, setNewTaskId] = useState(undefined);

  const inputChangeHandler = (e)=>{
    setInput({
      ... input,
      [e.target.name] : e.target.value
    })
  }

  useEffect( async ()=>{
    const eventProgress = progresses[event.progress_id]
    if(!newTaskId) return;
    // console.log("progressId", progress.id)
    await setProgresses({ // 이제서야 progress 추가
      ... progresses, 
      [event.progress_id]:{
        ...eventProgress,
        task_priority: eventProgress['task_priority'] + `,${newTaskId}` 
      }
    }); // here

  }, [tasks])


  async function clickAddHandler(e, target='task', id){
    setEvent({
      ...event,
      progress_id: ids.progress_id
    })
    // console.log('click', event.progress_id)
    e.stopPropagation();
    // TODO 😁 서버에서 새로 생성한 새로운 id 먼저 주시고
    // id를 기반으로 정보를 update 하자!
    const new_task_id = '100';

    // progress.task_priority 에 추가하기위해
    await setNewTaskId(new_task_id);

    if(target === 'task'){
      // task 추가하기
      await setTasks({ 
        ...tasks, 
        [new_task_id]: { // here
          id : new_task_id, // here
          title : input.title,
          description: input.description
      }})
    }

    // 입력창 닫기
    eventHandler.cancleAddInfo(e, 'form-add-task')
    // 입력 다 지우기
    await setInput({
      title: '',
      description: ''
    })

  }

  // console.log('여기 의심해봐, progress is undefined ? ', progress)
  return !progress ? '' : ( //! 혹시 여기 (!progress ? '' :) 
    <article className={"progress" + " " + progress.id} 
      onMouseDown={drag_n_drop.handleMouseDown}
      onMouseUp={(e)=>{drag_n_drop.handleMouseUp(e, store, ids)}}
      onMouseMove={drag_n_drop.handleMouseMove}
      >
      <section className="progress-head drag-drop">
        <input className="progress-title" 
          value={progress.title} 
          onChange={(e)=>{
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
            return !task ? '' : (
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
          value={input.title}
          onChange={inputChangeHandler}
        ></input>
        <textarea 
          name='description'
          className='form-add-task-input-description' 
          placeholder='Enter a description...'
          value={input.description}
          onChange={inputChangeHandler}
        ></textarea>

            <button 
              className='form-add-task-btn-add'
              onClick={clickAddHandler}
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