import React, { useState } from 'react';
import ProgressList from '../components/board/ProgressList.js';

import sortObject from '../helper/sortObject';
import drag_n_drop from '../helper/drag-n-drop.js';

import '../styles/board.css'

export default function Board(){
  // 상위 컴포넌트에서 한꺼번에 관리하자!

  const [ board, setBoard ] = useState({
    id : 1, // 숫자, 문자열 혼동 조심
    title : 'project',
    admin_userId : 1,
    prg_priority : '2,1' // (progress_id 순서) 관계는 부모가 갖고 있음 board - prg 관계는 board가 관여
  })

  const [ progresses, setProgresses ] = useState({
    // 객체 형태로 주어야할 것 같음. >> 원활한 state update를 위해서
    1 : { // key = progress_id
      id : 1, // <ProgressList /> name 세팅을 위해서 
      title : '안녕',
      task_priority : '1,2'
    },
    2 : {
      id : 2,
      title : 'progress 2',
      task_priority : '3', //'3,4'
    },
  })
  
  const [ tasks, setTasks ] = useState({
    1: { // key = card_id
      id : 1,
      title : 'task card 1',
    },
    2: {
      id : 2,
      title : 'task card 2',
    },
    3: {
      id : 3,
      title : 'task card 3',
    },
    4: {
      id : 4,
      title : 'task card 4',
    }
  })

  
  async function changePrgPriority (newPrgPriority){ // string type 기대
    await setBoard({
      ...board,
      prg_priority: newPrgPriority
    })
    console.log("Update newPrgPriority", newPrgPriority); 
  }

  async function changeTaskPriority ({ source, target }){
    // 삭제
    const source_new_task_priority = progresses[source.prgId].task_priority.split(',');
    source_new_task_priority.splice(source_new_task_priority.indexOf(source.taskId), 1);
    
    // 추가 - taskDropZone id 에 넣으면 된다!
    let target_new_task_priority = [];
    console.log(progresses[target.prgId].task_priority.length)
    if(progresses[target.prgId].task_priority.length === 0) target_new_task_priority = [source.taskId];
    else {
      target_new_task_priority = progresses[target.prgId].task_priority.split(',');
      target_new_task_priority.splice(target.taskDropZone, 0, source.taskId)
    }
    
    console.log("Before progresses.task_priority", progresses)
    
    // console.log(source_new_task_priority, target_new_task_priority)
    await setProgresses({
      ...progresses,
      [source.prgId] : {
        ...progresses[source.prgId],
        task_priority : source_new_task_priority.join(',')
      },
      [target.prgId] : {
        ...progresses[target.prgId],
        task_priority : target_new_task_priority.join(',')
      }
    })
    // setProgresses((prev)=>{
    //   console.log(prev)
    //   return prev;
    // })
    console.log("Update progresses.task_priority", progresses)
  }
  // changeTaskPriority()

  // drag-n-drop
  document.addEventListener('mousemove', drag_n_drop.handleMouseMove);
  console.log("Board")
  return (
    <div id="main-content">
      <section id="sub-nav-bar">
        <input className="btn-sub-nav-bar board_title" value={board.title}></input>
        <span className="btn-sub-nav-bar divider"></span>
        <button className="btn-sub-nav-bar member">member</button>
        <button className="btn-sub-nav-bar invite">invite</button>
      </section>
      <section id="progress-wrapper">
        {
          sortObject(progresses, board.prg_priority).map((progress, idx)=>{
            // console.log("progress.task_priority", progress)
            // console.log("tasks", tasks)
            return (
              <>
                <article className={`prg-dropzone prg-dropzone-${idx}`}></article>
                <ProgressList key={idx} progress={progress} tasks={tasks} 
                  changePrgPriority={changePrgPriority}
                  prg_priority={board.prg_priority}
                  changeTaskPriority={changeTaskPriority}
                />
              </>
            )
          })
        }
        <article className={`prg-dropzone prg-dropzone-${board.prg_priority.split(',').length}`}></article>
        <button className="btn-add-progress"> + Add another progress </button>
      </section>
    </div>
  )
}