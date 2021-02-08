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
      task_priority : '1,2,4'
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
      description: 'task 내용입니다. 나중에 description, member 적용할 것임.'
    },
    2: {
      id : 2,
      title : 'task card 2',
      description: 'task 내용입니다. 나중에 description, member 적용할 것임.'
    },
    3: {
      id : 3,
      title : 'task card 3',
      description: 'task 내용입니다. 나중에 description, member 적용할 것임.'
    },
    4: {
      id : 4,
      title : 'task card 4',
      description: 'task 내용입니다. 나중에 description, member 적용할 것임.'
    }
  })

  /* 공통 */
  async function inputChangeHandler(e, target, id){

    if(target === 'board') await setBoard({ ... board, title: e.target.value });
    if(target === 'progress') await setProgresses({ ...progresses, [id]: { ...progresses[id], title: e.target.value } })
    const inputValue = e.target.value;
    e.target.onkeypress = (e)=>{
      if(e.keyCode === 13){
        // 😁 title 수정 

        if(inputValue === '') return alert('빈칸은 입력이 불가능해요')
        console.log('타이틀 수정 완료');
        e.target.blur() // input focus 해제
      }
    }
  }

  async function clickAddHandler(e, target, id){
    // 서버에서 새로 생성한 새로운 id 먼저 주시고
    if(target === 'progress') {
      await setProgresses({ 
        ...progresses, 
        4: {
          id : 4,
          title : '새로 추가된 progress',
          task_priority : '', 
        }})
      await setBoard({ ... board, prg_priority: board['prg_priority'] + `,4` });
    }
    // if(target === 'task') setProgresses({ ...progresses, [id]: { ...progresses[id], title: e.value } })
    console.log(progresses, board)
  }

  /* (시작) drag-drop */
  //! Board 입장에서 Progress 순서 저장
  // 새로운 순서 인자로 넘김.
  async function changePrgPriority (newPrgPriority){ // string type 기대
    await setBoard({
      ...board,
      prg_priority: newPrgPriority
    })
    console.log("Update newPrgPriority", newPrgPriority); 
  }

  //! Progress 입장에서 Task 순서 저장
  // 여기서 새로운 순서 생성
  async function changeTaskPriority ({ source, target }){

    //같은 progress & 다른 taskDropZone 
    if(source.prgId === target.prgId){ 
      const prev_task_priority = progresses[source.prgId].task_priority.split(',');
      let new_task_priority = [];
      for(let i=0; i<prev_task_priority.length; i++){
        // 새로운 위치에 넣고
        if(i === Number(target.taskDropZone)) new_task_priority.push(source.taskId);
        // 다른 task 들은 순서대로 넣기
        if(prev_task_priority[i] !== source.taskId) new_task_priority.push(prev_task_priority[i]);
        // 예전 task는 지우기
        // else continue;
      }
      // 같은 progress 니깐 한곳만 update 하면 됨.
      await setProgresses({
        ...progresses,
        [source.prgId] : {
          ...progresses[source.prgId],
          task_priority : new_task_priority.join(',')
        },
      })
    }

    // 다른 progress
    else{
      // source(출발지) 삭제
      const source_new_task_priority = progresses[source.prgId].task_priority.split(',');
      source_new_task_priority.splice(source_new_task_priority.indexOf(source.taskId), 1);
      
      // target(도착지) 추가 - taskDropZone id 에 넣으면 된다!
      let target_new_task_priority = [];
        // 원래 빈 task_priority 였으면 바로 추가
      if(progresses[target.prgId].task_priority.length === 0) target_new_task_priority = [source.taskId];
      else {
        target_new_task_priority = progresses[target.prgId].task_priority.split(',');
        target_new_task_priority.splice(target.taskDropZone, 0, source.taskId)
      }

      // 출발지, 도착지 모두 update
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
    }

  }

  // drag-n-drop
  document.addEventListener('mousemove', drag_n_drop.handleMouseMove);

  /* (끝) drag-drop */
  console.log(board, progresses)
  return (
    <div id="main-content">
      <section id="sub-nav-bar">
        <input className="btn-sub-nav-bar board_title" value={board.title} onChange={(e)=>{inputChangeHandler(e,'board')}}></input>
        <span className="btn-sub-nav-bar divider"></span>
        <button className="btn-sub-nav-bar member">member</button>
        <button className="btn-sub-nav-bar invite">invite</button>
      </section>
      <section id="progress-wrapper">
        {
          sortObject(progresses, board.prg_priority).map((progress, idx)=>{
            return (
              <>
                <article className={`prg-dropzone prg-dropzone-${idx}`}></article>
                <ProgressList key={idx} progress={progress} tasks={tasks} 
                  changePrgPriority={changePrgPriority}
                  prg_priority={board.prg_priority}
                  changeTaskPriority={changeTaskPriority}
                  inputChangeHandler={inputChangeHandler}
                />
              </>
            )
          })
        }
        <article className={`prg-dropzone prg-dropzone-${board.prg_priority.split(',').length}`}></article>
        <button className="btn-add-progress" onClick={(e)=>{clickAddHandler(e, 'progress')}}> + Add another progress </button>
      </section>
    </div>
  )
}