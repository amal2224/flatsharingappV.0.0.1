import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect} from 'react'

import {getAllUser} from "../JS/actions/cardsActions"
import {getAllOffre} from "../JS/actions/offersActions"
import {getAllDemand} from "../JS/actions/demandsActions"

import "../styles/HomePage.css"
import LoadingPage from "./LoadingPage"
import UserList from './Profile/UserList';
import AllOffres from "./Offres/AllOffre"
import AllDemand from "./Demands/AllDemand"

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllOffre());
    dispatch(getAllDemand());
  }, [dispatch]);
  const CardsReducer = useSelector((state) => state.CardsReducer);
  const OffreReducer = useSelector((state) => state.OffreReducer);
  const DemandReducer = useSelector((state) => state.DemandReducer);
  
  if ((CardsReducer.isLoadListUser) || (OffreReducer.isLoadOffer)||(DemandReducer.isLoadDemand)){
    return (<LoadingPage/>)
  }

return (
// ***************UserList*************
<div className="homePContaint">
  {CardsReducer.usersList.length !== 0 && (
    <div className="homePageContanct stories">
      <div className="side-title">LIST USER</div>
      {CardsReducer.usersList.map((el, i) => (
                <UserList key={i} card={el} />
      ))}      
    </div>
  )} 
{/* **************DEMANDS & OFFERS***************** */}
    <div className="Right-side">
           {/* **********OFFRES************** */}
  {OffreReducer.allOffre.length !== 0 && (
    <div className="homePageContanct offres">
        <div className="side-title status-menuH">OFFRES</div>
        <div className="contenuOffresListI">
        {OffreReducer.allOffre.map((el, i) => (
          <div style={{"width":"30%"}}>
                <AllOffres key={i} offre={el} />
          </div>
        ))}
        </div>  
    </div>
  )}
       {/* **********DEMANDS************** */}
    <div className="homePageContanct demandss">
        <div className="side-title status-menuH">DEMANDS</div>
        <div className="contenuOffresListI">
        {DemandReducer.allDemand.map((el, i) => (
          <div style={{"width":"30%"}}>
              <AllDemand key={i} demand={el} />
          </div>
        ))}
        </div> 
    </div>

    </div>

    </div>


)}

export default HomePage;