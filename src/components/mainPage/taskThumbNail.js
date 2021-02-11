import React from 'react';
import { Link } from 'react-router-dom';

const TaskThumNail = (props) => {

    //boardName, board ID (primary key), userId(primary Key), Task Id(primary key), taskName(primary key)필요

    return(
        <Link to = {`/board/${props.boardId}/${props.taskId}`}>
            <div className = "myTaskThumbNail">
                <div className = "taskNameDiv">
                    <h3>{props.taskName}</h3>
                </div>
                <div className = "taskEtc">
                    {props.boardName}
                <div>{props.task_title}</div>
                </div>
            </div>
        </Link>
    )
}

export default TaskThumNail;