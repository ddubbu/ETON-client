import React, { useEffect } from 'react';
import eventHandler from '../../helper/eventHandler.js';

export default function TaskMenuDropDown ({ store }) {
	return (
		<ul name="task" className="drop-down">
      <li name="task" onClick={(e)=>eventHandler.clickDeleteSomething(e, store)}>삭제하기</li>
      <li name="task" onClick={(e)=>eventHandler.clickModifySomething(e, store)}>수정하기</li>
    </ul>
	)
}

