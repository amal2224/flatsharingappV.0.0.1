import React from 'react'
import { Link } from 'react-router-dom'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import "../../styles/HomePage.css"

const UserList = ({card}) => {
    return (
        <div>
        <div className="user">
            <img src={card.avatar} alt="" className="user-img"/>
                <div className="infoNA">
                    <div className="username">{card.fullName}</div>
                    <div className="album-date">{card.address}</div>
                </div>
                <Link to={`/Profile/${card._id}`} className="seeProfile">
                    <ArrowCircleRightIcon className="seeProfile" />
                </Link>
        </div>
        
        </div>
    )
}

export default UserList
