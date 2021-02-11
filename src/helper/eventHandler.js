import axiosRequest from '../../src/helper/axiosRequest.js';

/* 임시로 저장할거라서 component state 와 무관하게 정의함 */
export default {
  // progress, task 새로 추가를 위한 입력창 열어줌.
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
  cancleAddInfo : (e, target) => {
    console.log(e, "here")
    if(target === 'form-add-progress' || e.target.classList.contains('form-add-progress-btn-cancle')){
      document.querySelector('.form-add-progress')
      .style.display = 'none';

      document.querySelector('.btn-add-progress')
      .style.display = 'block'
    } else if(target === 'form-add-task' || e.target.classList.contains('form-add-task-btn-cancle')){
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

  //TODO : progress, task 삭제
  clickDeleteSomething: async (e, store)=>{
    
    const { state: board, setState: setBoard } = store.board;
    const { state: progresses, setState: setProgresses } = store.progresses;
    const { state: tasks, setState: setTasks } = store.tasks;
    const { state: modals, setState: setModals } = store.modals;
    const { state: event, setState: setEvent } = store.event;
    const { board_id: b, progress_id: p, task_id: t } = event;
    const accessToken = store.accessToken;

    // modal 에서 delete 를 누르면? 해당 ids 를 갖고 행동 이행 : 어디서할까? board? 여기서 하자(그럼, state, setState 모두 가져오자)

    //! progress 삭제
    if( !t ) {
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

      //TODO axios
      const response = await axiosRequest('/progress', accessToken, 'delete', { 
        board_id: b,
        progress_id: p,
        prg_priority: newPrgPriority
      })

      console.log("DELETE progress", response)

      
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


      //TODO axios
      const response = await axiosRequest('/task', accessToken, 'delete', { 
        board_id: b,
        progress_id: p,
        task_id: t,
        task_priority: newTaskPriority
      })
    }
  },

  // TODO : board, progress, task 수정
  clickModifyTask: async (e, store)=>{

    const { state: board, setState: setBoard } = store.board;
    const { state: progresses, setState: setProgresses } = store.progresses;
    const { state: tasks, setState: setTasks } = store.tasks;
    const { state: modals, setState: setModals } = store.modals;
    const { state: event, setState: setEvent } = store.event;
    const { board_id: b, progress_id: p, task_id: t } = event;

    console.log('modify card', b, p, t)

    await setModals({
      ... modals,
      task: false,
      task_edit: true
    })

  },
  submitModifyTask : async (e, store, input)=>{
    // TODO : axios PUT 수정사항

    // global state
    const { state: tasks, setState: setTasks } = store.tasks;
    const { state: event, setState: setEvent } = store.event;
    const { state: modals, setState: setModals } = store.modals;
    const { board_id: b, progress_id: p, task_id: t } = store.event.state;
    const accessToken = store.accessToken;

    // destructuring parameters
    const {title, description} = input;
    console.log(`-${title}-`)
    console.log(`-${description}-`)

    const newTitle = title === '' || title === undefined ? tasks[t].title : title;
    const newDescription = description === '' || description === undefined ? tasks[t].description : description;

    await setTasks({
      ...tasks, // 깊이 깊어지면, 이전 값 꼭 잘 넣어놓고!
      [t]:{
        ...tasks[t],
        title : newTitle,
        description : newDescription
      }
    })

    await setModals({
      ...modals,
      task_edit: false
    })

    //TODO axios
    const response = await axiosRequest('/task', accessToken, 'patch', {} ,{ 
      board_id: b,
      task_id: t,
      title: newTitle,
      description: newDescription
    })

    console.log("PATCH TASK 내용 수정", response)

    
  }, 
  titleModifyHandler: async (e, store, target, id)=>{

    const { state: board, setState: setBoard } = store.board;
    const { state: progresses, setState: setProgresses } = store.progresses;
    const { board_id: b, progress_id: p, task_id: t } = store.event.state;
    const accessToken = store.accessToken;
    console.log("e", e.target)
    if(target === 'board') {
      await setBoard({ ... board, title: e.target.value });
    }
    if(target === 'progress') {
      await setProgresses({ ...progresses, [id]: { ...progresses[id], title: e.target.value } });
    }

    const inputValue = e.target.value;
    e.target.onkeypress = async (e)=>{
      if(e.keyCode === 13){
        // TODO 😁 axios : board, progress title 수정 
        console.log(e.target.value, "title 수정")
        if(inputValue === '') return alert('빈칸은 입력이 불가능해요')
        e.target.blur() // input focus 해제

        if(target === 'board'){
          //TODO axios
          const response = await axiosRequest('/boards/title', accessToken, 'patch', 
            { board_id: b } ,
            { title: inputValue }
          );

          console.log("PATCH board tilte 수정", response)
        } else if(target === 'progress'){
          //TODO axios
          const response = await axiosRequest('/progress/title', accessToken, 'put', 
            { } ,
            { 
              board_id: b,
              progress_id: p,
              title: inputValue
            }
          );

          console.log("PATCH progress tilte 수정", response)
        }

      }
    }
  },


  // TODO : board, progress 순서 수정
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

  },
  /* (끝) drag-drop */

  toggleModal : async (e, store, ids)=>{
    // modal 띄울만한거 : member, progress-menu, task-menu
    // task-edit 모달은 그냥 닫기만 해주세요
    const { state: modals, setState: setModals } = store.modals;
    const { state: event, setState: setEvent } = store.event;

    await setModals({
      [e.target.name] : !modals[e.target.name]
    })

    console.log(e.target.name)
    if(e.target.name !== 'task_edit' && !modals[e.target.name]){ // 만약 떠있으면
      const $drop_down = document.querySelector('.drop-down')
      $drop_down.style.left =  `${e.target.getBoundingClientRect().left}px`; //`${e.clientX}px`
      $drop_down.style.top = `${e.target.getBoundingClientRect().bottom}px`
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
}