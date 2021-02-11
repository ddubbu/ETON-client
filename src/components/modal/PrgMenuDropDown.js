import React, { useEffect } from 'react';
import eventHandler from '../../helper/eventHandler.js';

export default function PrgMenuDropDown ({store}) {
	return (
		<ul name="progress" className="drop-down">
      <li name="progress" onClick={(e)=>eventHandler.clickDeleteSomething(e, store)}>
        삭제하기
      </li>
    </ul>
	)
}

