import React, { useState } from 'react';
import BoardThumNail from '../components/mainPage/boardThumbNail';
import Profile from '../components/mainPage/profile';
import TaskThumNail from '../components/mainPage/taskThumbNail';
import '../styles/main.css';

const mockData = {              
    data : [    //서버에서 데이터 넘겨주는 형식 고민해봐야 함. 이렇게 주는 방법보다는 보드랑 태스크 각각 나눠서 주는게 제일 좋을듯.
        {
        boardId : 1,
        boardName : 'board1',
        taskId : 1,
        task_title : '제목입니다', taskname : 'task1'
        },
        {
        boardId : 1,
        boardName : 'board1',
        taskId : 2,
        task_title : '제목입니다', taskname : 'task2'
        },
        {
        boardId : 1,
        boardName : 'board1',
        taskId : 3,
        task_title : '제목입니다', taskname : 'task3'
        },
        {
        boardId : 2,
        boardName : 'board2',
        taskId : 4,
        task_title : '제목입니다', taskname : 'task4'
        },
        {
        boardId : 3,
        boardName : 'board3',
        taskId : 5,
        task_title : '제목입니다', taskname : 'task5'
        },
        {
        boardId : 4,
        boardName : 'board4',
        taskId : 6,
        task_title : '제목입니다', taskname : 'task6'
        },
        {
        boardId : 5,
        boardName : 'board5',
        taskId : 7,
        task_title : '제목입니다', taskname : 'task7'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 8,
        task_title : '제목입니다', taskname : 'task8'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 9,
        task_title : '제목입니다', taskname : 'task9'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 10,
        task_title : '제목입니다', taskname : 'task10'
        },
        {
        boardId : 6,
        boardName : 'board6',
        taskId : 11,
        task_title : '제목입니다', taskname : 'task11'
        },
        
    ],
    user : {
        id : 1,
        name : 'Sponge Bob',
        email : 'Sponge@Bob.com'
    }
}

const Main = () => {

    const [boardThumNailShowMore, setBoardThumbNailShowMore] = useState(false);
    const [taskThumbNailShowMore, setTaskThumbNailShowMore] = useState(false);

    
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
//////////////////////데이터 처리
    let boardList = [];

    mockData.data.forEach(el => {
        let boardId = el.boardId;
        let boardName = el.boardName;
        let flag = true;
        for(let i = 0; i < boardList.length; i++){
            if(boardList[i].boardId === boardId){
                flag = false;
                break;
            }
        }
        if(flag){
            boardList.push({boardId, boardName});
        }
    })

    console.log("boardList : ", boardList);
//////////////////////
    
    const numberOfBoardThumbNails = boardThumNailShowMore ? boardList.length : 4;
    const numberOfTaskThumbNails = taskThumbNailShowMore ? mockData.data.length : 5;

    return (
        <div className="mainContainer">
            <div className="mainSidebar">
                <div className="sticky">
                    <Profile userId = {mockData.user.id} userName = {mockData.user.name} userEmail = {mockData.user.email}/>
                    
                </div>
            </div>
            <div className="mainBody">
                <div className="myBoard">
                    <h3>My Board</h3>
                    <div className="myBoardListContainer">
                        <div className="myBoardList">
                            {boardList.slice(0, numberOfBoardThumbNails).map((el, i) => {
                                return <BoardThumNail boardName = {el.boardName} boardId = {el.boardId} key = {i} />
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
                            {mockData.data.slice(0, numberOfTaskThumbNails).map((el,i) => {
                                return <TaskThumNail boardId = {el.boardId} boardName = {el.boardName} taskId = {el.taskId} taskName = {el.taskname} task_title={el.task_title} key = {i}/>
                            })}
                        </div>
                        {/* <button className={`mainButton`}>Show More</button> */}
                        {mockData.data.length <= 5 ? '' :                         <button className={`mainButton`} onClick={taskThumbNailShowMore ? showLessTaskThumbNail : showMoreTaskThumbNail}>{taskThumbNailShowMore ? 'Show Less' : 'Show More'}</button>}
                        {/* <button className={`mainButton`} onClick={taskThumbNailShowMore ? showLessTaskThumbNail : showMoreTaskThumbNail}>{taskThumbNailShowMore ? 'Show Less' : 'Show More'}</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;