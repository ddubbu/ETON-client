import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

const CreateNewBoardModal = (props) => {

    const [title, setTitle] = useState('');

    const closeCreateNewBoard = () => {
        props.closeCreateNewBoard();
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const submitCreateNewBoard = () => {
        // axios.defaults.baseURL = 'https://geteton.ga';
        axios.post("https://geteton.ga/boards",{
            title
        },{
            headers : {authorization : `bearer ${props.accessToken}`}
        })
        .then(result => {
            console.log("success!",result);
            closeCreateNewBoard();
            props.history.push(`/board/${result.data.id}`)
        })
        .catch(err => {
            console.log("err : ", err);
            alert('보드 만들기에 실패했습니다');
            closeCreateNewBoard();
        })
    }

    

    return(
        ReactDOM.createPortal(
            <div className = "createNewBoardModalDiv" >
                <div className = "createNewBoardModalContents">
                    <button className="createNewBoardModalDivButton" onClick = {closeCreateNewBoard}>&times;</button>
                    <h2>Create new Board</h2> 
                    
                    <input 
                        placeholder = "My New Board"
                        onChange = {handleTitle}
                        value = {title}
                        />
                    <button 
                        className = "createNewBoardButton"
                        onClick = {submitCreateNewBoard}>
                        Create New Board
                    </button>
                </div>
            </div>,
            document.querySelector('.App')
        )
        
    )
}
export default withRouter(CreateNewBoardModal);