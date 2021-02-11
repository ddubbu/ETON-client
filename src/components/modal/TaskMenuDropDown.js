import React, { useEffect } from 'react';
import eventHandler from '../../helper/eventHandler.js';

export default function TaskMenuDropDown ({ store }) {
	return (
		<section name="task" className="drop-down">
      <p className="action-title">divst Actions</p>
      <div name="task" onClick={(e)=>eventHandler.clickDeleteSomething(e, store)}>삭제하기</div>
      <div name="task" onClick={(e)=>eventHandler.clickModifyTask(e, store)}>수정하기</div>
    </section>
	)
}

