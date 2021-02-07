export default {
  handleMouseDown : (e) => { // 클릭한 요소 감지, .hold 이름 붙여주기
    const $el = e.target;
    const classList = $el.classList;
    if( !classList.contains('progress') && !classList.contains('task')) {
      return console.log('progress 아님')
    }
    if( !classList.contains('hold') ){
      // target 클릭했을 때, 마우스 커서의 XY좌표
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // 선택한 요소의 XY좌표 (왼쪽 상단 모서리 기준)
      const pos = $el.getBoundingClientRect();
      const x = pos.x;
      const y = pos.y;

      // 선택한 요소 안에 있는 마우스 커서의 XY좌표
      const gapX = mouseX - x;
      const gapY = mouseY - y;
      
      $el.setAttribute("gap-x", gapX);
      $el.setAttribute("gap-y", gapY);
      console.log("MouseDown", e.target.classList);
      classList.add("hold");
    }
  },
  handleMouseMove : function(e){ // .hold 요소 > 움직임 > 위치 반영하기
    const $el = document.querySelector(".hold");
    if( $el ){
      // 움직이는 마우스 커서의 XY좌표 : 새로운 위치
      const mouseX = e.clientX;
      const mouseY = e.clientY;
            
      // 선택한 공 안에 있는 마우스 커서의 XY좌표
      const gapX = $el.getAttribute("gap-x");
      const gapY = $el.getAttribute("gap-y");
      
      // 마우스 커서의 위치에 따른 공의 XY좌표
      const x = mouseX - gapX;
      const y = mouseY - gapY;
      
      // 공의 위치를 변경
      $el.style.left = x +"px";
      $el.style.top = y +"px";

      // $dropzone 위치 감지
      const $dropzones = document.querySelectorAll('.prg-dropzone');
      $dropzones.forEach($dropzone=>{
        const x = $dropzone.getBoundingClientRect().x;
        if( mouseX > x && mouseX < x + 272) { 
          // hover 로 하려고 했는데, $el 이 target 이라 $dropzone:hover 인식안됨.
          // 안에 들어오면 넓혀주고, 배경색로 알려주기
          $dropzone.style.width = '272px'
          $dropzone.style.background = 'rgb(161, 161, 161, 0.2)';
        }else {
          // 감지된거 다시 reset 해줘야함.
          $dropzone.style.width = '0px'
        }
      })
    }
  },
  handleMouseUp : function(e, changePriority, prev_priority){ // 손을 놓았을 때 > new priority : state 변경
    // progress, task 일반화
    const $el = document.querySelector(".hold");
    if( $el ){
      // 움직이면 적용된 속성 및 class를 삭제
      $el.removeAttribute("gap-x")
      $el.removeAttribute("gap-y")
      $el.classList.remove("hold");

      // 놓여진 progressId
      const progressId = Number(
        Array.from($el.classList).filter(className=>{
          if(!Number.isNaN(Number(className))) {
            console.log(Number(className))
            return true
          } 
          return false;
        })
      )

      // 놓여진 마우스 커서의 XY좌표
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // 놓여진 $dropzone 찾고, 새로운 priority 로 state 변경
      const $dropzones = document.querySelectorAll('.prg-dropzone');
      const split_prev_priority = prev_priority.split(',');
      // progressId 지움
      const other_priority = split_prev_priority.filter(pri=>{
        if(Number(pri) === progressId) return false;
        else return true;
      })
      // console.log("split_prev_priority", split_prev_priority)

      const new_priority = [];
      for(let idx=0; idx<$dropzones.length; idx ++){
        const x = $dropzones[idx].getBoundingClientRect().x;
        if( mouseX > x && mouseX < x + 272) { 
          // console.log('dropzone number', idx)
          new_priority.push(progressId);
        }else if(other_priority.length !== 0){
          // console.log('dropzone pass', idx)
          new_priority.push(other_priority.shift())
          // $dropzones[idx].style.width = '0px'
        }
      }

      // state 변경
      if(new_priority.length === split_prev_priority.length 
        && new_priority.join(',') !== prev_priority){
        // console.log("new", new_priority.join(','))
        changePriority(new_priority.join(','));
      }

      // dropzone 크기 바꾸기 : 마지막이나 처음 $dropzone reset 을 위해
      $dropzones.forEach($dropzone=>{
        $dropzone.style.width='0px'
      })

    }
  }
}