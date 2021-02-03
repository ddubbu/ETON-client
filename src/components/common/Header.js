import React, { useState } from 'react';
import SignUpModal from '../modal/signUpModal';

const Header = () => {

    //props로 isLogin상태를 받아와서 로그인이 안되있을 경우 SignUp과 Login 버튼을 보여주고
    //로그인이 되어있을 경우 마이페이지를 보여준다.

    const [signUpModalOpen, setSignUpModal] = useState(false);

    const openSignUpModal = () => {
        setSignUpModal(true)
    }

    const closeSignUpModal = () => {
        alert('close');
        setSignUpModal(false)
        console.log("signUpModalOpen : ", signUpModalOpen);
    }

    return (
        <div className = "Header">
            <div className = "logo">
                ETON
            </div>
            <div className = "space">

            </div>
            <div className = "buttonDiv">
                
                <button 
                    className="btn"
                    onClick={openSignUpModal}
                >
                    Sign Up
                </button>
                <SignUpModal isOpen = {signUpModalOpen} open = {openSignUpModal} close = {closeSignUpModal} />
                <button className="btn">Login</button>
            </div>
        </div>
    )
}

export default Header;