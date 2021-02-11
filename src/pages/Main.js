import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BoardThumNail from '../components/mainPage/boardThumbNail';
import Profile from '../components/mainPage/profile';
import TaskThumNail from '../components/mainPage/taskThumbNail';
import CreateNewBoardModal from '../components/modal/createNewBoardModal';
import '../styles/main.css';


const Main = ({accessToken}) => {

    const [boardThumNailShowMore, setBoardThumbNailShowMore] = useState(false);
    const [taskThumbNailShowMore, setTaskThumbNailShowMore] = useState(false);

    const [boardList, setBoardList] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [userInfo, setUserInfo] = useState('');

    const [showCreateNewBoardModal, setShowCreateNewBoardModal] = useState(false);
    
    const showMoreBoardThumbNail = () => {
        setBoardThumbNailShowMore(true);
    }

    const showLessBoardThumbNail = () => {
        setBoardThumbNailShowMore(false);
    }

    const showMoreTaskThumbNail = () => {
        setTaskThumbNailShowMore(true);
    }

    const showLessTaskThumbNail = () => {
        setTaskThumbNailShowMore(false);
    }

    const createNewBoard = () => {
        setShowCreateNewBoardModal(true);
    }

    const closeCreateNewBoard = () => {
        setShowCreateNewBoardModal(false);
    }

    useEffect(() => {
        console.log("useEffect");
        getBoardList();
        getTaskList();
        getUserInfo();
    },[accessToken]);

    const getBoardList = async () => {
        console.log("GET Board LIST!!!");
        // const taskList = await axios.get('https://geteton.ga/boards',{
        //     headers : {authorization : "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJkZW1vLXVzZXIiLCJlbWFpbCI6IjFAZGVtby5jb20iLCJwaWN0dXJlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTAyLTEwVDE0OjI1OjA1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTAyLTEwVDE0OjI1OjA1LjAwMFoiLCJpYXQiOjE2MTMwMzk1NzIsImV4cCI6MTYxMzA0Njc3Mn0.8BrfaSZWfWMr2a5Hd87QqDIfA2z_Cpt1pnl4abfNpzs"}
        // })
        // console.log("taskList : ", taskList);
        const requestBoard = await axios.get('https://geteton.ga/boards/all',{
            headers : {authorization : `bearer ${accessToken}`}
        })
        .then(res => res.data)
        .catch(err => {
            console.log("err : ", err);
        })
        if(requestBoard){
            setBoardList(requestBoard.data.boardList);
        }else{
            console.log("err");
        }
    }

    const getTaskList = async () => {
        console.log("GET TASK LIST!!");

        const requestTask = await axios.get('https://geteton.ga/task/user',{
            headers : {authorization : `bearer ${accessToken}`}
        })
        .then(res => res.data)
        .catch(err => {
            console.log("@@@@Task err : ", err);
        })
        // console.log("@@@@@@@@@@@requestTask : ", requestTask);
        if(requestTask){
            setTaskList(requestTask.taskList);
        }
    }

    const getUserInfo = async () => {
        const requestUserInfo = await axios.get('https://geteton.ga/users/userinfo',{
            headers : {authorization : `bearer ${accessToken}`}
        })
        .then(res => res.data)
        .catch(err => {
            console.log("@@userInfo err : ", err);
        })

        console.log(requestUserInfo);
        if(requestUserInfo){
            setUserInfo(requestUserInfo.data.userInfo);
        }
    }
    
    const numberOfBoardThumbNails = boardThumNailShowMore ? boardList.length : 4;
    const numberOfTaskThumbNails = taskThumbNailShowMore ? taskList.length : 5;

    return (
        <div className="mainContainer">
            <div className="mainSidebar">
                <div className="sticky">
                    <Profile userId = {userInfo.id} userName = {userInfo.username} userEmail = {userInfo.email} accessToken = {accessToken}/>
                    <div className = "createBoardButtonDiv">
                        <button className = "createNewBoardButton" onClick = {createNewBoard}>New Board ✚</button>
                        {showCreateNewBoardModal &&<CreateNewBoardModal closeCreateNewBoard = {closeCreateNewBoard} createNewBoard = {createNewBoard} accessToken = {accessToken}/>}
                    </div>
                    
                </div>
                
            </div>
            <div className="mainBody">
                <div className="myBoard">
                    <h3>My Board</h3>
                    <div className="myBoardListContainer">
                        <div className="myBoardList">
                            {boardList.slice(0, numberOfBoardThumbNails).map((el, i) => {
                                return <BoardThumNail boardName = {el.title} boardId = {el.id} key = {i} />
                            })}
                        </div>
                        {boardList.length <= 4 ? '' : <button className = {`mainButton`} onClick = {boardThumNailShowMore? showLessBoardThumbNail : showMoreBoardThumbNail}>{boardThumNailShowMore ? 'Show Less' : 'Show More'}</button> }
                        {/* <button className = {`mainButton`} onClick = {boardThumNailShowMore? showLessBoardThumbNail : showMoreBoardThumbNail}>{boardThumNailShowMore ? 'Show Less' : 'Show More'}</button> */}
                    </div>
                </div>
                <div className="myTask">
                    <h3>Task</h3>
                    <div className="myTaskListContainer">
                        <div className="myTaskList">
                            {/* <div className="taskItem">TaskItem</div> */}
                            {taskList.slice(0, numberOfTaskThumbNails).map((el,i) => {
                                return <TaskThumNail boardId = {el.boardId} boardName = {el.boardTitle} taskId = {el.id} taskName = {el.title} description={el.description} key = {i}/>
                            })}
                        </div>
                        {/* <button className={`mainButton`}>Show More</button> */}
                        {taskList.length <= 5 ? '' :                         <button className={`mainButton`} onClick={taskThumbNailShowMore ? showLessTaskThumbNail : showMoreTaskThumbNail}>{taskThumbNailShowMore ? 'Show Less' : 'Show More'}</button>}
                        {/* <button className={`mainButton`} onClick={taskThumbNailShowMore ? showLessTaskThumbNail : showMoreTaskThumbNail}>{taskThumbNailShowMore ? 'Show Less' : 'Show More'}</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;