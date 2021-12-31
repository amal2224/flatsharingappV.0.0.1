import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "../../styles/AllOffre.css"

const AllDemand = ({i,demand}) => {
    return (
        <div id="AllDemands" >
            <div className="videos">
                <div className="video-wrapper">
                    <img className="imagee" src={demand.image} alt="imageOffre" />
                    {/* avatar + FullName */}
                    <div className="imageNameUser">
                        <div className="author-img__wrapper video-author">
                            <img className="author-img" src={demand.owner.avatar} alt="avatarUser"/>
                        </div>
                        <div className="nameee">{demand.owner.fullName}</div>
                    </div>
                    </div> 
                
                    {/* offre title */}
                    <div className="itemOffreTitle">
                        <div style={{"display":"flex","flexDirection":"row"}}>
                            <p className="titleO"><i>Offre Title</i></p>
                            <div className="monthRent">{demand.monthlyRent} <span className="rentM">DT/M</span></div>
                        </div>
                        <div className="titleNameee">{demand.title}</div>
                    </div>

                    <div className="seeMore">
                        <MoreHorizIcon style={{"color":"#0594DF"}}/>
                        <p className="titleDetails">More Details</p>
                    </div>                
                </div>

    </div>
    )
}
export default AllDemand;