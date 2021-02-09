import React, { useEffect } from 'react';

export default function PrgMenuDropDown ({event: eventState}) {
	return (
		<ul className="drop-down">
      <li onClick={console.log(eventState)}>
        삭제하기
      </li>
    </ul>
	)
}

