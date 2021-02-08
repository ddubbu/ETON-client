export default {
  handleMouseDown : (e) => { // 클릭한 요소 감지, .hold 이름 붙여주기
    const $el = e.target;
    const classList = $el.classList;

    if( !classList.contains('progress') && !classList.contains('task')) {
      return console.log('progress, task 둘다 아님')
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

      //! progress 가 움직일 때는 세로로만
      if($el.classList.contains('progress')){
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

      //! task 가 움직일 때는 세로, 가로 모두 고려
      else if($el.classList.contains('task')){
        // $dropzone 위치 감지
        const $dropzones = document.querySelectorAll('.task-dropzone');
        $dropzones.forEach($dropzone=>{
          const x = $dropzone.getBoundingClientRect().x;
          const y = $dropzone.getBoundingClientRect().y;

          // 가로 세로 dropzone 내부 체크
          if( (mouseX > x && mouseX < x + 272) && (mouseY > y && mouseY < y + 100 ) ) { 
            $dropzone.style.width = '256px';
            $dropzone.style.height = '100px';
            $dropzone.style.background = 'rgb(161, 161, 161, 0.2)';
          }else {
            // 감지된거 다시 reset 해줘야함.
            $dropzone.style.height = '0px'
          }
        })
      }
    }
  },
  handleMouseUp : function(e, changePriority, prev_priority, changeTaskPriority){ // 손을 놓았을 때 > new priority : state 변경
    // progress, task 일반화
    const $el = document.querySelector(".hold");
    if( $el ){
      // 움직이면 적용된 속성 및 class를 삭제
      $el.removeAttribute("gap-x")
      $el.removeAttribute("gap-y")
      $el.classList.remove("hold");

      // 놓여진 마우스 커서의 XY좌표
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if($el.classList.contains('progress')){

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

      } /* [끝] $el.classList.contains('progress') */
      else if($el.classList.contains('task')){

        let progressId_taskId = Array.from($el.classList).filter(str=>{
          if(!str.match(/^prg-/)) return false;
          else return true;
        })[0];

        //! 출발지 
        const source = { //출발지 정보
          prgId: progressId_taskId.split('-')[1],
          taskId: progressId_taskId.split('-')[3]
        }
        console.log(`출발지 progressId-${source.prgId}-taskZone-${source.taskId}`)

        // 놓여진 $dropzone 찾고, 새로운 priority 로 state 변경
        const $dropzones = document.querySelectorAll('.task-dropzone');

        // const new_priority = [];
        $dropzones.forEach($dropzone=>{
          const x = $dropzone.getBoundingClientRect().x;
          const y = $dropzone.getBoundingClientRect().y;

          // 가로 세로 dropzone 내부 체크
          if( (mouseX > x && mouseX < x + 272) && (mouseY > y && mouseY < y + 100 ) ) { 
            // new_priority.push(progressId);
            // console.log("놓은 곳", $dropzone.classList);
            //! 도착지
            let progressId_taskId = Array.from($dropzone.classList).filter(str=>{
              if(!str.match(/^prg-/)) return false;
              else return true;
            })[0];

            const target = { //도착지 정보
              prgId: progressId_taskId.split('-')[1],
              taskDropZone: progressId_taskId.split('-')[3]
            }
            console.log(`도착지 progressId-${target.prgId}-taskZone-${target.taskDropZone}`)

            // statte 변경
            changeTaskPriority({source, target})

          }else {
            // 감지된거 다시 reset 해줘야함.
            // $dropzone.style.height = '0px'
          }
        })

        // // state 변경
        // if(new_priority.length === split_prev_priority.length 
        //   && new_priority.join(',') !== prev_priority){
        //   // console.log("new", new_priority.join(','))
        //   changePriority(new_priority.join(','));
        // }

        // dropzone 크기 바꾸기 : 마지막이나 처음 $dropzone reset 을 위해
        $dropzones.forEach($dropzone=>{
          $dropzone.style.height='0px'
        })

      } 
    }
  }
}