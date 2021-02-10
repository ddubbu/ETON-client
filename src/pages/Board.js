import React, { useState } from 'react';
// import ReactDOM from 'react-dom'
import ProgressList from '../components/board/ProgressList.js';
import MemberDorpDown from '../components/modal/MemberDropDown.js';
import PrgMenuDropDown from '../components/modal/PrgMenuDropDown.js';
import TaskMenuDropDown from '../components/modal/TaskMenuDropDown.js';
import TaskInfoEdit from '../components/modal/TaskInfoEdit.js';

import sortObject from '../helper/sortObject';
import drag_n_drop from '../helper/drag-n-drop.js';
import eventHandler from '../helper/eventHandler.js';

import '../styles/board.css'

export default function Board(){
  // 상위 컴포넌트에서 한꺼번에 관리하자!

  const [ board, setBoard ] = useState({
    id : 1, // 숫자, 문자열 혼동 조심
    title : 'project',
    admin_userId : 1,
    prg_priority : '2,1,3' // (progress_id 순서) 관계는 부모가 갖고 있음 board - prg 관계는 board가 관여
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
    3 : {
      id : 3,
      title : 'progress 3',
      task_priority : '4', //'3,4'
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

  const [ members, setMembers ] = useState([ 
    { id: 1, name: '사람1' },
    { id: 2, name: '사람2'}
  ] );

  // 모달 띄우고 있는지 여부
  const [ modals, setModals ] = useState({ 
    member : false,
    memberSearch : false,
    progress : false,
    task : false,
    task_edit: false,
  })

  // event state 감지
  const [ event, setEvent ] = useState({
    method : 'PUT', // GET, POST, PUT, DELETE
    target : 'task', // board, progress, target
    content : { // 무엇이든
      title: '',
      description: ''
    }, 
    board_id : board.id,
    progress_id : null,
    task_id : null
  })

  // redux 처럼 전체 state 통솔 객체
  const store = {
    board: { // 모두 객체 주소니깐 업데이트 안해줘도 괜찮겠지?
      state : board,
      setState : setBoard
    },
    progresses: { // 모두 객체 주소니깐 업데이트 안해줘도 괜찮겠지?
      state : progresses,
      setState : setProgresses
    },
    tasks : {
      state: tasks,
      setState : setTasks
    },
    members : {
      state: members,
      setState: setMembers
    },
    modals : {
      state : modals,
      setState: setModals
    },
    event: {
      state: event,
      setState: setEvent
    }
  }

  //! 여기서부터 progress 추가 코드
  // local state
  const [input, setInput] = useState({
    title: '',
    description: ''
  })

  const inputChangeHandler = (e)=>{
    setInput({
      ... input,
      [e.target.name] : e.target.value
    })
  }

  async function clickAddHandler(e, target='progress', id){
    // TODO 😁 서버에서 새로 생성한 새로운 id 먼저 주시고
    const new_prg_id = '5'
    
    if(target === 'progress') {
      await setProgresses({ 
        ...progresses, 
        [new_prg_id]: { // here
          id : new_prg_id, // here
          title : input.title,
          task_priority : '', 
        }})
      await setBoard({ ... board, prg_priority: board['prg_priority'] + `,${new_prg_id}` }); // here
    } 
  }
 
  // drag-n-drop
  document.addEventListener('mousemove', drag_n_drop.handleMouseMove);

  /* (끝) drag-drop */

  return (
    <div id="main-content">
      <section id="sub-nav-bar">
        <input className="btn-sub-nav-bar board_title" value={board.title} onChange={(e)=>{eventHandler.titleModifyHandler(e, store, 'board')}}></input>
        <span className="btn-sub-nav-bar divider"></span>
        <button name='member' className="btn-sub-nav-bar member" onClick={(e)=>eventHandler.toggleModal(e, store)}>member</button>
        
        <button className="btn-sub-nav-bar invite">invite</button>
      </section>
      {/* 모달은 position:absolute 이므로 한꺼번에 정의하자, 누르면 활성화되도록 */}
      { modals.member ? <MemberDorpDown members={members} />  : '' }
      { modals.progress ? <PrgMenuDropDown store={store} /> : '' }
      { modals.task ? <TaskMenuDropDown store={store} /> : '' }
      { modals.task_edit ? <TaskInfoEdit store={store} /> : '' }

      <section id="progress-wrapper">
        {
          sortObject(progresses, board.prg_priority).map((progress, idx)=>{
            return (
              <>
                <article className={`prg-dropzone prg-dropzone-${idx}`}></article>
                <ProgressList key={idx}
                  ids={{board_id: board.id, progress_id: progress.id}}
                  store={store}
                />
              </>
            )
          })
        }
        <article className={`prg-dropzone prg-dropzone-${board.prg_priority.split(',').length}`}></article>
        {/* 누르기전까지 숨어 있음 */}
        <article className='progress form-add-progress'>
          <input 
            name='title'
            className='form-add-progress-input' 
            placeholder='Enter progress title...'
            onChange={inputChangeHandler}
          ></input>
          <button className='form-add-progress-btn-add' onClick={clickAddHandler}>Add progress</button>
          <button 
            className='form-add-progress-btn-cancle'
            onClick={eventHandler.cancleAddInfo}
          >X</button>
        </article>
        <button 
          className="btn-add-progress" 
          onClick={e=>{eventHandler.clickAddSomething(e, 'progress')}}
        > + Add another progress 
          </button>
      </section>
    </div>
  )
}


