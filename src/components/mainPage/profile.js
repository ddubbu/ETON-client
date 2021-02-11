import React, { useState } from 'react';
import UserInfoEdit from '../modal/userInfoEdit';

const Profile = (props) => {

    const [showModal, setShowModal] = useState(false);

    const showEditModal = () => {
        setShowModal(true);
    }

    const closeEditModal = () => {
        setShowModal(false);
    }

    return(
        <div className="profileDiv">
            <div className = "profileHeader">
                <h2>My Info</h2>
                <button 
                    className = "profileEditButton mainButton"
                    onClick = {showEditModal}    
                >✎</button>
            </div>
            <div className = "pictureDiv">
                <img src='../image/스폰지밥.png' className = "profilePicuture"></img>
            </div>
            <div className = "infoDiv">
                <h3>{props.userName}</h3>
                <h3>{props.userEmail}</h3>
            </div>
            {showModal ? <UserInfoEdit userId = {props.userId} closeEditModal = {closeEditModal} username = {props.userName} userEmail = {props.userEmail} accessToken = {props.accessToken}/> : null}
        </div>
    )
}

export default Profile;