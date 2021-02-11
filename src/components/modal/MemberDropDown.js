import React, { useEffect } from 'react';

export default function MemberDorpDown ({members}) {
	return (
		<section className="drop-down member">
      <p className="action-title">List participants</p>
      {members.map((member, idx)=>{
        return (
        <div className={`member-${member.id} drop-down-member`} key={idx}>
          <div className='member-name'>{member.name}</div>
          <button>x</button>
        </div>
        )
      })}

		</section>
	)
}

