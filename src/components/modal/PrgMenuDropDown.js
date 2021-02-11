import React, { useEffect } from 'react';
import eventHandler from '../../helper/eventHandler.js';

export default function PrgMenuDropDown ({store}) {
	return (
		<section name="progress" className="drop-down">
      <p className="action-title">List Actions</p>
      <div name="progress" onClick={(e)=>eventHandler.clickDeleteSomething(e, store)}>
        삭제하기
      </div>
    </section>
	)
}

