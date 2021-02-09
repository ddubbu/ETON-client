import React, { useEffect } from 'react';

export default function TaskMenuDropDown ({event}) {
	return (
		<ul name="task" className="drop-down">
      <li name="task" className="delete">삭제하기</li>
      <li name="task" className="modify">수정하기</li>
    </ul>
	)
}

