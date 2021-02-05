import React, { useState } from 'react';

export default function TaskList({ task }){
  return (
    <input className={ "task-head drag-drop" + " " + task.id } value={task.title}></input>
  )
}