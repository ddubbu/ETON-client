import React, { useEffect } from 'react';

export {
  function ({members}) {
    return (
      <ul className="drop-down member">
        {members.map((member, idx)=>{
          return (
          <li className={`member-${member.id}`} key={idx}>
            {member.name}
            <button>x</button>
          </li>
          )
        })}

      </ul>
    )
  },

}

