/* 임시로 저장할거라서 component state 와 무관하게 정의함 */
export default {
  submitAddInfo : function handler(target){  // 'progress' or 'task'

    // closure 변수가 여기있어야한다니...!
    const input = {
      title: '',
      description: ''
    }
  
    return function submitAddInfo(e){  //$(.form-add-progress-btn-add)
  
      if(input.title.length !== 0){
        // TODO 😁 progress 새로이 추가하고 응답으로 state(board.prg_priority, progresses) 업데이트하기 
        // TODO 😁 task도 마찬가지
        console.log('axios POST target', target,'input 수정 완료', input);
      } else if(e && e.target.tagName === 'BUTTON'){
        alert('title 을 입력해주세요')
      }
  
      return function inputChangeHandler(e){ //$(.form-add-progress .form-add-progress-input)
        input[e.target.name] = e.target.value;
      }
    }
  }, 
  cancleAddInfo : (e) => {
    if(e.target.classList.contains('form-add-progress-btn-cancle')){
      document.querySelector('.form-add-progress')
      .style.display = 'none';

      document.querySelector('.btn-add-progress')
      .style.display = 'block'
    } else if(e.target.classList.contains('form-add-task-btn-cancle')){
      document.querySelectorAll('.form-add-task') // 특정 아이디 지정 안하고 모두 순회
      .forEach($el=>{
        $el.style.display = 'none';
      })

      document.querySelectorAll('.btn-add-task') // (얘도) 특정 아이디 지정 안하고 모두 순회
      .forEach($el=>{
        $el.style.display = 'block';
      })
    }

  },
  clickAddSomething : (e, target, prg_id)=>{
    if(target === 'progress'){
      const $form_add_progress = document.querySelector('.form-add-progress');
      // 위에서 아래로 생기는 action은 나중에
      $form_add_progress.style.display = 'flex'
      e.target.style.display = 'none'
    } else if (target === 'task'){
      const $form_add_task = document.querySelector(`.form-add-task.prg-${prg_id}`);
      // 위에서 아래로 생기는 action은 나중에
      $form_add_task.style.display = 'flex'
      e.target.style.display = 'none'
    }
  },
  openModal : async (e, store, ids)=>{
    // modal 띄울만한거 : member, progress-menu, task-menu
    const { state: modals, setState: setModals } = store.modals;
    const { state: event, setState: setEvent } = store.event;

    await setModals({
      [e.target.name] : !modals[e.target.name]
    })
    if(!modals[e.target.name]){ // 만약 떠있으면
      const $drop_down = document.querySelector('.drop-down')
      $drop_down.style.left =  `${e.target.getBoundingClientRect().x}px`; //`${e.clientX}px`
      $drop_down.style.top = `${e.target.getBoundingClientRect().y  }px`
    }

    // 상태변경하고 event 에 넣어두기 -> dropDown요소 event 발생할 수 있어서 (삭제, 수정)
    if(ids){ // member 모달은 click event 할 때 member_id 갖고 있으니깐 따로 작업 안해줘도 됨.
      setEvent({
        ...event,
        board_id : ids.board_id,
        progress_id : ids.progress_id,
        task_id : ids.task_id
      })
    }

    
  },
  clickDeleteSomething: async (e, store)=>{
    
    const { state: board, setState: setBoard } = store.board;
    const { state: progresses, setState: setProgresses } = store.progresses;
    const { state: tasks, setState: setTasks } = store.tasks;
    const { state: modals, setState: setModals } = store.modals;
    const { state: event, setState: setEvent } = store.event;
    const { board_id: b, progress_id: p, task_id: t } = event;

    // modal 에서 delete 를 누르면? 해당 ids 를 갖고 행동 이행 : 어디서할까? board? 여기서 하자(그럼, state, setState 모두 가져오자)

    //! progress 삭제
    if( !t ) {
      //TODO eventState ids 로 axios 요청 보내시오
      //TODO progress 자체를 삭제하면 연관된 task도 삭제해야해서, 한번 다시 GET, render 하는게 빠를 수도
      // console.log("delete", b, p);
      const newPrgPriority = board.prg_priority.split(',')
      .filter(el=>String(p) === el ? false : true)
      .join(',');

      // 1. board 변경
      await setBoard({
        ...board, 
        prg_priority: newPrgPriority
      })

      // 2. progress 변경
      delete progresses[p];
      await setProgresses({
        ...progresses
      })

      await setModals({
        progress: false
      })
      
    } else { //! task 삭제
      //TODO eventState ids 로 axios 요청 보내시오
      // console.log("delete", b, p, t)

      const newTaskPriority = progresses[p].task_priority.split(',')
      .filter(el=>String(t) === el ? false : true)
      .join(',');

      // 1. progress 변경
      await setProgresses({
        ...progresses,
        [p]: { // p 말고 [p] 변수값 입니다 ^^
          ...progresses[p],
          task_priority: newTaskPriority
        }
      })

      // 2. task 변경
      delete tasks[t];
      await setTasks({
        ...tasks
      })

      await setModals({
        task: false
      })
    }
  },
  clickModifyTask: (e)=>{

  }, 
  inputChangeHandler: async (e, store, target, id)=>{

    const { state: board, setState: setBoard } = store.board;
    const { state: progresses, setState: setProgresses } = store.progresses;
    if(target === 'board') await setBoard({ ... board, title: e.target.value });
    if(target === 'progress') await setProgresses({ ...progresses, [id]: { ...progresses[id], title: e.target.value } })
    const inputValue = e.target.value;
    e.target.onkeypress = (e)=>{
      if(e.keyCode === 13){
        // TODO 😁 axios : board, progress title 수정 

        if(inputValue === '') return alert('빈칸은 입력이 불가능해요')
        console.log(board.title, '타이틀 수정 완료');
        e.target.blur() // input focus 해제
      }
    }
  },


  /* (시작) drag-drop */
   changePrgPriority: async function changePrgPriority (store, newPrgPriority, ids){ // string type 기대
    //! Board 입장에서 Progress 순서 저장
    // 새로운 순서 인자로 넘김.
    const { state: board, setState: setBoard } = store.board;
    const { state: progresses, setState: setProgresses } = store.progresses;
    const { state: tasks, setState: setTasks } = store.tasks;
    const progress = progresses[ids.progress_id]

    await setBoard({
      ...board,
      prg_priority : newPrgPriority
    }) 
  },

  changeTaskPriority : async function changeTaskPriority (store, ids,{  source, target }){
    //! Progress 입장에서 Task 순서 저장
    // 여기서 새로운 순서 생성

    const { state: board, setState: setBoard } = store.board;
    const { state: progresses, setState: setProgresses } = store.progresses;
    const { state: tasks, setState: setTasks } = store.tasks;
    const progress = progresses[ids.progress_id]

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
      // console.log(progresses, source.prgId)
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
}