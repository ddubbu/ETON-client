import React from 'react';
import { Link } from 'react-router-dom';

const BoardThumNail = (props) => {

    //boardId (primary key) 와 이름, 유저 아이디 필요

    return(
        <Link to = {`/board/${props.boardId}`} className = "boardThumbNail">
            <div className = "boardThumbNailDiv">
                {props.boardName}
            </div>
        </Link>
    )
}

export default BoardThumNail;