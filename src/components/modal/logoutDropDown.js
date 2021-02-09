import axios from 'axios';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const LogoutDropDown = (props) => {



    const closeLogoutDropDown = e => {
        if(logoutContainer.current && !logoutContainer.current.contains(e.target)){
          props.closeLogoutDropDown();
        }
      }

    const logoutContainer = React.createRef();

    useEffect(() => {
        document.addEventListener('mousedown', closeLogoutDropDown);
      })

    const handleLogout = () => {
        
        axios.post('https://geteton.ga/users/signout',{},
        {headers : {'authorization' : props.accessToken},
        withCredentials:true})
        .then(res => {
            console.log("LOGOUT!!!!!!!@@@@##");
            props.HandleLogout();
            props.history.push('/');
        })
        .catch(err => {
            console.log("LOGOUT - err : ", err);
        })
    }

    return(
        <div className = "logoutDropDownDiv" ref = {logoutContainer}>
            
            <div className = "logoutDropDownArticleDiv">
                정말 로그아웃 하시겠습니까? Real?
            </div>
            <div className = "logoutDropDownButtonDiv">
                <button onClick = {handleLogout} className = "logoutButton">Logout</button>
                
            </div>
        </div>
    )
}

export default withRouter(LogoutDropDown);