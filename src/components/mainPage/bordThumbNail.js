import React from 'react';
import { Link } from 'react-router-dom';

const BordThumNail = (props) => {

    //bordId (primary key) 와 이름, 유저 아이디 필요

    return(
        <Link to = {`/bord/${props.bordId}`} className = "bordThumbNail">
            <div className = "bordThumbNailDiv">
                {props.bordName}
            </div>
        </Link>
    )
}

export default BordThumNail;