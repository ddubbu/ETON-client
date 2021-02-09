/* 임시로 저장할거라서 component state 와 무관하게 정의함 */
export default {
  submitAddInfo : function handler(target){  // 'progress' or 'task'

    // closure 변수가 여기있어야한다니...!
    const input = {
      title: '',
      description: ''
    }
  
    return function submitAddInfo(e){  //$(.form-add-progress-btn-add)
      // console.log('click')
  
      if(input.title.length !== 0){
        // TODO 😁 progress 새로이 추가하고 응답으로 state(board.prg_priority, progresses) 업데이트하기 
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
      const $form_add_progress = document.querySelector(`.form-add-task.prg-${prg_id}`);
      // 위에서 아래로 생기는 action은 나중에
      $form_add_progress.style.display = 'flex'
      e.target.style.display = 'none'
    }
  },
  openModal : async (e, modals222, setModals222, ids, store)=>{
    // modal 띄울만한거 : member, progress-menu, task-menu
    const modals = store.modals.state;
    const setModals = store.modals.setState;
    // console.log(modals, setModals)
    await setModals({
      [e.target.name] : !modals[e.target.name]
    })
    if(!modals[e.target.name]){ // 만약 떠있으면
      const $drop_down = document.querySelector('.drop-down')
      $drop_down.style.left =  `${e.target.getBoundingClientRect().x}px`; ////`${e.clientX}px`
      $drop_down.style.top = `${e.target.getBoundingClientRect().y + 20 }px` ///20
    }

    // console.log(ids)
  },
  clickDeleteSomething: (e)=>{
    // modal 에서 delete 를 누르면? 해당 ids 를 갖고 행동 이행 : 어디서할까? board? 여기서 하자(그럼, state, setState 모두 가져오자)

  },
  clickModifyTask: (e)=>{

  }
}