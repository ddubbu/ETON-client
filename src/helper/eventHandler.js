/* 임시로 저장할거라서 component state 와 무관하게 정의함 */
export default {
  submitAddInfo : function handler(target){  // 'progress' or 'task'

    // closure 변수가 여기있어야한다니...!
    const input = {
      title: '',
      description: ''
    }
  
    return function submitAddInfo(e){  //$(.form-add-progress-btn-add)
      console.log('click')
  
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
        console.log($el)
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
  }
}