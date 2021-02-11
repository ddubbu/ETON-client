import React, { useState } from 'react';
import App from '../../App';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


const UserInfoEdit = (props) => {
    //유저정보를 main에서부터 건너건너 이름이랑 이메일을 전해줄지, 아니면 id만 건네줘서 그걸로 검색하게 할지
    //유저정보수정할때 비밀번호 필요하게 할지 안할지

    const [userEmail, setUserEmail] = useState(props.userEmail);
    const [userName, setUserName] = useState(props.username);

    const handleUserEmail = (e) => {
        setUserEmail(e.target.value);
    }

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const closeEditModal = () => {
        props.closeEditModal();
    }

    const requestUserInfoEdit = () => {
        if(userName.length < 2){
            alert('이름은 2글자 이상으로 해주세요!');
        }else{
            axios.put("https://geteton.ga/users/userinfo",{
                username : userName
            },{
                headers : {authorization : `bearer ${props.accessToken}`}
            })
            .then(res => {
                console.log("성공");
                props.history.push('/');
                closeEditModal();
            })
            .catch(err => {
                alert('수정 실패하였습니다.')
                closeEditModal();
            })
        }
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
                        disabled 
                    />
                    <div className = "userInfoEditDivLabel">이름</div>
                    <input
                        type="text"
                        onChange={handleUserName}
                        value = {userName}
                    />
                    <button 
                        className="userInfoEditDivButton-submit"
                        onClick={requestUserInfoEdit}
                    >
                        수정하기</button>
                </div>
            </div>,
            document.querySelector('.App')
        )
        
    )
}

export default withRouter(UserInfoEdit);