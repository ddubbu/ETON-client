import React, { useState } from 'react';
import App from '../../App';
import ReactDOM from 'react-dom';


const UserInfoEdit = (props) => {
    //유저정보를 main에서부터 건너건너 이름이랑 이메일을 전해줄지, 아니면 id만 건네줘서 그걸로 검색하게 할지
    //유저정보수정할때 비밀번호 필요하게 할지 안할지

    const [userEmail, setUserEmail] = useState('Sponge@Bob.com');
    const [userName, setUserName] = useState('Sponge Bob');

    const handleUserEmail = (e) => {
        setUserEmail(e.target.value);
    }

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const closeEditModal = () => {
        props.closeEditModal();
    }

    return (
        ReactDOM.createPortal(
            <div className = "userInfoEditDiv" >
                <div className = "userInfoEditDivContents">
                    <button onClick={closeEditModal} className="userInfoEditDivButton-close">&times;</button>
                    <h1>Edit User Info</h1> 
                    <div className = "userInfoEditDivLabel">이메일</div>
                    <input 
                        type = "text"
                        onChange = {handleUserEmail}
                        value = {userEmail}    
                    />
                    <div className = "userInfoEditDivLabel">이름</div>
                    <input
                        type="text"
                        onChange={handleUserName}
                        value = {userName}
                    />
                    <button className="userInfoEditDivButton-submit">수정하기</button>
                </div>
            </div>,
            document.querySelector('.App')
        )
        
    )
}

export default UserInfoEdit;