import React, { useState } from 'react';
import BordThumNail from '../components/mainPage/bordThumbNail';
import Profile from '../components/mainPage/profile';
import TaskThumNail from '../components/mainPage/taskThumbNail';
import '../styles/main.css';

const mockData = {              
    data : [    //서버에서 데이터 넘겨주는 형식 고민해봐야 함. 이렇게 주는 방법보다는 보드랑 태스크 각각 나눠서 주는게 제일 좋을듯.
        {
        bordId : 1,
        bordName : 'bord1',
        taskId : 1,
        taskname : 'task1'
        },
        {
        bordId : 1,
        bordName : 'bord1',
        taskId : 2,
        taskname : 'task2'
        },
        {
        bordId : 1,
        bordName : 'bord1',
        taskId : 3,
        taskname : 'task3'
        },
        {
        bordId : 2,
        bordName : 'bord2',
        taskId : 4,
        taskname : 'task4'
        },
        {
        bordId : 3,
        bordName : 'bord3',
        taskId : 5,
        taskname : 'task5'
        },
        {
        bordId : 4,
        bordName : 'bord4',
        taskId : 6,
        taskname : 'task6'
        },
        {
        bordId : 5,
        bordName : 'bord5',
        taskId : 7,
        taskname : 'task7'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 8,
        taskname : 'task8'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 9,
        taskname : 'task9'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 10,
        taskname : 'task10'
        },
        {
        bordId : 6,
        bordName : 'bord6',
        taskId : 11,
        taskname : 'task11'
        },
        
    ],
    user : {
        id : 1,
        name : 'Sponge Bob',
        email : 'Sponge@Bob.com'
    }
}

const Main = () => {

    const [bordThumNailShowMore, setBordThumbNailShowMore] = useState(false);
    const [taskThumbNailShowMore, setTaskThumbNailShowMore] = useState(false);

    
    const showMoreBordThumbNail = () => {
        setBordThumbNailShowMore(true);
    }

    const showLessBordThumbNail = () => {
        setBordThumbNailShowMore(false);
    }

    const showMoreTaskThumbNail = () => {
        setTaskThumbNailShowMore(true);
    }

    const showLessTaskThumbNail = () => {
        setTaskThumbNailShowMore(false);
    }
//////////////////////데이터 처리
    let bordList = [];

    mockData.data.forEach(el => {
        let bordId = el.bordId;
        let bordName = el.bordName;
        let flag = true;
        for(let i = 0; i < bordList.length; i++){
            if(bordList[i].bordId === bordId){
                flag = false;
                break;
            }
        }
        if(flag){
            bordList.push({bordId, bordName});
        }
    })

    console.log("bordList : ", bordList);
//////////////////////
    
    const numberOfBordThumbNails = bordThumNailShowMore ? bordList.length : 4;
    const numberOfTaskThumbNails = taskThumbNailShowMore ? mockData.data.length : 5;

    return (
        <div className="mainContainer">
            <div className="mainSidebar">
                <div className="sticky">
                    <Profile userId = {mockData.user.id} userName = {mockData.user.name} userEmail = {mockData.user.email}/>
                    
                </div>
            </div>
            <div className="mainBody">
                <div className="myBord">
                    <h3>My Bord</h3>
                    <div className="myBordListContainer">
                        <div className="myBordList">
                            {bordList.slice(0, numberOfBordThumbNails).map((el, i) => {
                                return <BordThumNail bordName = {el.bordName} bordId = {el.bordId} key = {i} />
                            })}
                        </div>
                        {bordList.length <= 4 ? '' : <button className = {`mainButton`} onClick = {bordThumNailShowMore? showLessBordThumbNail : showMoreBordThumbNail}>{bordThumNailShowMore ? 'Show Less' : 'Show More'}</button> }
                        {/* <button className = {`mainButton`} onClick = {bordThumNailShowMore? showLessBordThumbNail : showMoreBordThumbNail}>{bordThumNailShowMore ? 'Show Less' : 'Show More'}</button> */}
                    </div>
                </div>
                <div className="myTask">
                    <h3>Task</h3>
                    <div className="myTaskListContainer">
                        <div className="myTaskList">
                            {/* <div className="taskItem">TaskItem</div> */}
                            {mockData.data.slice(0, numberOfTaskThumbNails).map((el,i) => {
                                return <TaskThumNail bordId = {el.bordId} bordName = {el.bordName} taskId = {el.taskId} taskName = {el.taskname} />
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