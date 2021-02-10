import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import eventHandler from '../../helper/eventHandler'

export default function TaskInfoEdit ({store}){
  return(
    ReactDOM.createPortal( // $(.App) component 와 별개로 스타일 적용하고 싶을 때, Modal에서 주로 사용될 듯
      <section id="task-edit-form-wrapper" >
        <section id="task-edit-form">
          <input placeholder="제목"></input>
          <textarea placeholder="내용"></textarea>
          <button name="task_edit">save</button>
          <button name="task_edit" onClick={(e)=>eventHandler.toggleModal(e, store)}>cancle</button>
        </section>
      </section>,

      document.querySelector('.App')
    )
  )
}