/* 임시로 저장할거라서 component state 와 무관하게 정의함 */
export default {
  add_progress_or_task : function handler(target){  // 'progress' or 'task'

    // closure 변수가 여기있어야한다니...!
    const input = {
      title: '',
      description: ''
    }
  
    return function clickAddProgress(e){  //$(.form-add-progress-btn-add)
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
  }
}