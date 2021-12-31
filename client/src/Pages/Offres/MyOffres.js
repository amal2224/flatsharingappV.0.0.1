import React from "react";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import EventIcon from '@mui/icons-material/Event';
import SellIcon from '@mui/icons-material/Sell';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from "react-redux";
import { deleteOffre } from "../../JS/actions/offersActions";
import "../../styles/offreItem.css"

const MyOffres = ({ offre, id }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
    console.log("offre :" ,offre);
  return (
    <div id="offerComponent">
      {auth.user._id === id && (
        <div className="delete-offerComponent">
          <IconButton onClick={() => dispatch(deleteOffre(offre._id))}>
            <CancelIcon fontSize="large" color="secondary" />
          </IconButton>
        </div>
      )}

      <div className="offerComponent-img">
        <img id="img-Offre"  src={offre.image} alt="" />
      </div>
      <div className="offerComponent-description">
        <div className="offerComponent-title" title={offre.title}>
          {offre.title}
        </div>
        
        <div className="offerComponent-date" myDate={offre.myDate}>
          <EventIcon style={{"paddingRight":"5px"}}/>
          {/* {offre.myDate.slice(0,10)} */}
          {offre.myDate}
        </div>
        <div className="offerComponent-date">
          <LocationOnIcon style={{"paddingRight":"5px"}}/>
          {offre.ville}
        </div>
      </div>

        <div className="offerComponent-date">
          <SellIcon style={{"paddingRight":"5px"}}/>
          <span>{offre.monthlyRent}</span> DT/Month
        </div>

    </div>
  );
};

export default MyOffres;