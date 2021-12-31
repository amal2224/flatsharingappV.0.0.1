import React from "react";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import EventIcon from '@mui/icons-material/Event';
import SellIcon from '@mui/icons-material/Sell';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from "react-redux";
import { deleteDemand } from "../../JS/actions/demandsActions";
import "../../styles/offreItem.css"

const MyDemands = ({ demand, id }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div id="offerComponent">
      {auth.user._id === id && (
        <div className="delete-offerComponent">
          <IconButton onClick={() => dispatch(deleteDemand(demand._id))}>
            <CancelIcon fontSize="large" color="secondary" />
          </IconButton>
        </div>
      )}

      <div className="offerComponent-img">
        <img id="img-Offre"  src={demand.image} alt="" />
      </div>
      <div className="offerComponent-description">
        <div className="offerComponent-title" title={demand.title}>
          {demand.title}
        </div>
        
        <div className="offerComponent-date" myDate={demand.myDate}>
          <EventIcon style={{"paddingRight":"5px"}}/>
          {demand.myDate.slice(0,10)}
        </div>
        <div className="offerComponent-date">
          <LocationOnIcon style={{"paddingRight":"5px"}}/>
          {demand.ville}
        </div>
      </div>

        <div className="offerComponent-date">
          <SellIcon style={{"paddingRight":"5px"}}/>
          <span>{demand.maxRent}</span> DT/Month
        </div>

    </div>
  );
};

export default MyDemands;