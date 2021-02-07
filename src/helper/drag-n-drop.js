export default {
  handleMouseDown : (e) => {
    const el = e.target;
    const classList = el.classList;
    if( !classList.contains('progress') && !classList.contains('task')) {
      return console.log('progress 아님')
    }
    if( !classList.contains('hold') ){
      // target 클릭했을 때, 마우스 커서의 XY좌표
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // 선택한 공의 XY좌표 (왼쪽 상단 모서리 기준)
      const pos = el.getBoundingClientRect();
      const x = pos.x;
      const y = pos.y;

      // 선택한 공 안에 있는 마우스 커서의 XY좌표
      const gapX = mouseX - x;
      const gapY = mouseY - y;
      
      el.setAttribute("gap-x", gapX);
      el.setAttribute("gap-y", gapY);
      console.log("MouseDown", e.target);
      classList.add("hold");
    }
  },
  handleMouseMove : function(e){
    const el = document.querySelector(".hold");
    if( el ){
      // console.log("Move", el);
      // 움직이는 마우스 커서의 XY좌표
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // 선택한 공 안에 있는 마우스 커서의 XY좌표
      const gapX = el.getAttribute("gap-x");
      const gapY = el.getAttribute("gap-y");
      
      // 마우스 커서의 위치에 따른 공의 XY좌표
      const dancerX = mouseX - gapX;
      const dancerY = mouseY - gapY;
      
      // 공의 위치를 변경
      el.style.left = dancerX+"px";
      el.style.top = dancerY+"px";
    }
  },
  handleMouseUp : function(){
    const el = document.querySelector(".hold");
    if( el ){
      // 움직이면 적용된 속성 및 class를 삭제
      el.removeAttribute("gap-x")
      el.removeAttribute("gap-y")
      el.classList.remove("hold");
    }
  },
  drag_handler(e) {
    //  ondrag =  드래그할때 동작 
    console.log("Drag");
  },
  dragover_handler(e) {
    //ondragover = draggable 엘리먼트가 drop영역위에 올라가면 
    console.log("dragOver");
    e.preventDefault();
  },      
  drop_handler(e) {
    //ondrop = draggable 엘리먼트를 drop영역위에 떨어트리면
    console.log("droooop!");
    document.getElementsByClassName("drag-box")[0].style.top=e.layerY+"px";
    document.getElementsByClassName("drag-box")[0].style.left=e.layerX+"px";
    e.preventDefault();
  }
}