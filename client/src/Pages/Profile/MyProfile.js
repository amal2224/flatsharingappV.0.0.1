import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';


import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import "../../styles/userProfile.css"

import { getProfile } from "../../JS/actions/profileActions";
import { addOffre, getUserOffre } from "../../JS/actions/offersActions";
import { addDemand, getUserDemand } from "../../JS/actions/demandsActions";
import { getComment } from "../../JS/actions/commentActions";

import { removeActions } from "../../JS/actions/removeActions";

import MyOffres from '../Offres/MyOffres'
import MyDemands from '../Demands/MyDemands'
import ProfileComment from '../Comments/ProfileComment';
import LoadingPage from '../LoadingPage';

const MyProfile = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth);
    const ProfileReducer = useSelector((state) => state.ProfileReducer);
    const OffreReducer = useSelector((state) => state.OffreReducer);
    const DemandReducer =useSelector((state) => state.DemandReducer);
    const CommentReducer = useSelector((state) => state.CommentReducer);
    let { id } = useParams();
    useEffect(() => {
        if (id) {
        dispatch(getProfile(id));
        dispatch(getUserOffre(id));
        dispatch(getUserDemand(id))
        dispatch(getComment(id));
        }
    return () => {
        dispatch(removeActions());
    };
    }, [dispatch,id]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowOffre = () => setShow(true);

    const [showD, setShowD] = useState(false);
    const handleCloseD = () => setShowD(false);
    const handleShowD = () => setShowD(true);
    
    const [imageOffre, setImageOffre] = useState(null);
    const [imageDemand, setImageDemand] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        "https://www.cidj.com/sites/default/files/styles/og_image/public/2019-02/colocation.jpg?itok=gYhe6zP2"
        );
    const [previewImageDemand, setPreviewImageDemand] = useState(
        "https://thumbs.dreamstime.com/b/d-house-search-concept-render-houses-magnifying-glass-searching-unique-54337196.jpg"
        );

    // content of offre
    const [offre, setOffre] = useState({
    title: "",
    ville: "",
    roomNumber: "",
    description:"",
    monthlyRent:"",
    });

    // content of demand
    const [demand, setDemand] = useState({
    title: "",
    ville: "",
    roomNumber :"",
    description:"",
    maxRent: "",
    });
// add image offre
    const offreImageHandler = (e) => {
        const file = e.target.files[0];
        setImageOffre(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // add image demand
    const demandImageHandler = (e) => {
        const file = e.target.files[0];
        setImageDemand(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImageDemand(reader.result);
        };
        reader.readAsDataURL(file);
    };
    
    // offre
    const handleOffre = (e) => {
        setOffre({ ...offre, [e.target.name]: e.target.value });
    };
    
    // demand
    const handleDemand = (e) => {
        setDemand({ ...demand, [e.target.name]: e.target.value });
    };
// ******************LOADING************************
    if(CommentReducer.IsComment){
        return(<LoadingPage/>)
    }
    // if ((ProfileReducer.isLoadProfile) || (OffreReducer.isLoadOffer) ||(DemandReducer.isLoadDemand) || (CommentReducer.IsComment) 
    // ||(auth.IsLoad)){
    //     return (<LoadingPage/>)
    // }
    
    return (
<>
{ProfileReducer.profile &&
<div className="main-container">
{/*------------- image, avatar ,couverture */}
            <div className="profile">
        <div className="profile-avatar">
            {/* profile */}
            <img src={ProfileReducer.profile.avatar} alt="" className="profile-img"/>
        </div>
{/*------------ couverture */}
        <img src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="" className="profile-cover"/>
        <div className="profile-menu">
            <p className="profile-menu-link ">{ProfileReducer.profile.fullName}</p>
        </div>
            </div>
        
        <div className="timeline">
{/* ------------about section ---------------------*/}
            <div className="timeline-left">
                
                {/* about */}
                <div className="intro box">
                <div className="intro-title">
                    About
                    {auth.user._id === id && (
                        <Link to="/EditProfile" className="intro-menu">
                            <img  src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-edit-miscellaneous-kiranshastry-gradient-kiranshastry.png" alt="edit" style={{width:"25px", height:"25px"}}/>
                        </Link>
                    )}
                </div>

                <div className="info">
                    <div className="info-item">
                    <span className="about-item">Email :</span>  <span id="infoItemSpan">{ProfileReducer.profile.email}</span>
                    </div>

                    <div className="info-item">
                    <span className="about-item">phone :</span> <span id="infoItemSpan">{ProfileReducer.profile.phoneNumber}</span>
                    </div>
                    {/* social */}
                <div id="socialItem">
                    {/* fb */}
                    <div className="info-item">
                        <a
                            href={ProfileReducer.profile.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <FacebookIcon/>
                        </a>
                    </div>
                    {/* twitter */}
                    <div className="info-item">
                        <a
                            href={ProfileReducer.profile.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <TwitterIcon/>
                        </a>
                    </div>
                    {/* instagram */}
                    <div className="info-item">
                        <a
                            href={ProfileReducer.profile.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <InstagramIcon/>
                        </a>
                    </div>
                </div>
                </div>
                </div>
                
            </div>

{/*-------------offre & demands------------------- */}
        <div id="globleOD">
        {/* offre add+list */}
            <div className="timeline-right">
            <div className="status box">
            <div className="status-menu">
                <div className="status-menu-item active">My offers</div>
            </div>

     {/* --------- display all offres */}
    
    <div id="listItems">
            {    
                (OffreReducer.offres.length !== 0) 
                && OffreReducer.offres.map((el, i) =><MyOffres key={i} offre={el} id={id} />)    
            }
    </div>
    {/* add offre */}
    <div className="status-actions">
            {auth.user._id === id && (
        <Button onClick={handleShowOffre} className="status-share">
            add New
        </Button>
        )}
    </div>
            {/*-------------- add new offer */}
            <Modal show={show} onHide={handleClose} style={{"marginTop":"5%","height":"90%"}}>
        <Modal.Header closeButton>
            <Modal.Title>Add New Offre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="offer-wrapper">
                    <div
                        className="offer-drop-box"
                        onClick={(e) => {
                            setOffre({
                                title: "",
                                ville: "",
                                roomNumber: "",
                                description:"",
                                monthlyRent:"",
                            });
                        setPreviewImage("https://www.cidj.com/sites/default/files/styles/og_image/public/2019-02/colocation.jpg?itok=gYhe6zP2");
                        setImageOffre(null);
                    }}
                    />
                    <div className="offer addOffer__animation">
                        {/* add image */}
                    <div className="offer-image">
                        <div>
                            <img src={previewImage} alt="" className="offer-img"/>
                        </div>
                        <div className="offer-img-label">
                        <label htmlFor="offer-image">Choose image</label>
                        <input
                            type="file"
                            id="offre-image"
                            name="image"
                            onChange={offreImageHandler}
                            accept="image/*"
                        />
                        </div>
                    </div>
                    <div className="offer-description">
                        {/* add title */}
                        <div className="offer-title">
                        <input
                            type="text"
                            name="title"
                            onChange={handleOffre}
                            value={offre.title}
                            placeholder="Add title"
                            maxLength="25"
                            style={{"width":"100%","marginTop":"2%"}}
                        />
                        </div>
                        {/* add ville:  */}
                        <div className="offer-title">
                        <input
                            type="text"
                            name="ville"
                            onChange={handleOffre}
                            value={offre.ville}
                            placeholder="Add ville"
                            maxLength="25"
                            style={{"width":"100%","marginTop":"2%"}}
                        />
                        </div>
                        {/* add description */}
                        <div className="offer-specification">
                        <textarea
                            name="description"
                            onChange={handleOffre}
                            value={offre.description}
                            cols="30"
                            rows="10"
                            placeholder="Add description"
                            maxLength="300"
                            style={{"width":"100%","marginTop":"2%"}}
                        ></textarea>
                        </div>
                    </div>
                    <div className="offer-bottom">
                        {/* roomNumber:  */}
                        <div className="offer-price">
                            <input
                                type="number"
                                name="roomNumber"
                                onChange={handleOffre}
                                value={offre.roomNumber}
                                placeholder="roomNumber"
                                style={{"width":"100%","marginTop":"2%"}}
                            />
                        </div>
                        {/*     monthlyRent:"", */}
                        <div className="offer-price">
                            <input
                                type="number"
                                name="monthlyRent"
                                onChange={handleOffre}
                                value={offre.monthlyRent}
                                placeholder="monthly Rent in DTT"
                                style={{"width":"100%","marginTop":"2%"}}
                            />
                        </div>
                    </div>
            </div>
                </div>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={(e) => {
                            handleClose(true)
                            setOffre({
                                title: "",
                                ville: "",
                                roomNumber: "",
                                description:"",
                                monthlyRent:"",
                            });
                            setPreviewImage("https://www.cidj.com/sites/default/files/styles/og_image/public/2019-02/colocation.jpg?itok=gYhe6zP2");
                            setImageOffre(null);
                        }}>
            Close
        </Button>
        <Button variant="primary"
            disabled={
                offre.title &&
                offre.ville &&
                offre.roomNumber &&
                offre.description && 
                offre.monthlyRent 
                    ? false
                    : true
            }
            onClick={(e)=>{
                handleClose(true)
                dispatch(addOffre(offre, imageOffre));
                    setOffre({
                        title: "",
                        ville: "",
                        roomNumber: "",
                        description:"",
                        monthlyRent:"",
                    });
                    setPreviewImage("https://www.cidj.com/sites/default/files/styles/og_image/public/2019-02/colocation.jpg?itok=gYhe6zP2");
                    setImageOffre(null);
        }}>
            Save
        </Button>
        </Modal.Footer>
            </Modal>
</div>
    </div>        
            {/* demand add + list*/}
            <div className="timeline-rightDemands">
            <div className="status box">
            <div className="status-menu-demands">
                <div className="status-menu-item active">My demands</div>
            </div>

     {/* --------- display all offres */}
    <div id="listItems">
            {    
                (DemandReducer.demands.length !== 0) 
                && DemandReducer.demands.map((el, i) =><MyDemands key={i} demand={el} id={id} />)    
            }
    </div>
    {/* add demand */}
        <div className="status-actions">
            {auth.user._id === id && (
            <Button onClick={handleShowD} className="status-share">
                add New
            </Button>
            )}
        </div>
            {/*-------------- add new demand */}
        <Modal show={showD} onHide={handleCloseD} style={{"marginTop":"3%","height":"90%"}}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Demand</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="offer-wrapper">
                    <div
                        className="offer-drop-box"
                        onClick={(e) => {
                            // setShowDemand(false);
                            setDemand({
                                title: "",
                                ville: "",
                                roomNumber :"",
                                description:"",
                                maxRent: "",
                            });
                        setPreviewImageDemand("https://thumbs.dreamstime.com/b/d-house-search-concept-render-houses-magnifying-glass-searching-unique-54337196.jpg");
                        setImageDemand(null);
                    }}
                    />
                    <div className="offer addOffer__animation">
                        {/* add image */}
                    <div className="offer-image">
                        <div >
                            <img src={previewImageDemand} alt="" className="offer-img" />
                        </div>
                        <div className="offer-img-label">
                        <label htmlFor="offer-image">Choose image</label>
                        <input
                            type="file"
                            id="offre-image"
                            name="image"
                            onChange={demandImageHandler}
                            accept="image/*"
                        />
                        </div>
                    </div>
                    <div className="offer-description">
                        {/* add title */}
                        <div className="offer-title">
                        <input
                            type="text"
                            name="title"
                            onChange={handleDemand}
                            value={demand.title}
                            placeholder="Add title"
                            maxLength="25"
                            style={{"width":"100%","marginTop":"2%"}}
                        />
                        </div>
                        {/* add ville:  */}
                        <div className="offer-title">
                        <input
                            type="text"
                            name="ville"
                            onChange={handleDemand}
                            value={demand.ville}
                            placeholder="Add ville"
                            maxLength="25"
                            style={{"width":"100%","marginTop":"2%"}}
                        />
                        </div>
                        {/* add description */}
                        <div className="offer-specification">
                        <textarea
                            name="description"
                            onChange={handleDemand}
                            value={demand.description}
                            cols="30"
                            rows="10"
                            placeholder="Add description"
                            maxLength="300"
                            style={{"width":"100%","marginTop":"2%"}}
                        ></textarea>
                        </div>
                    </div>
                    <div className="offer-bottom">
                        {/* roomNumber:  */}
                        <div className="offer-price">
                            <input
                                type="number"
                                name="roomNumber"
                                onChange={handleDemand}
                                value={demand.roomNumber}
                                placeholder="roomNumber"
                                style={{"width":"100%","marginTop":"2%"}}
                            />
                        </div>
                        {/*     maxRent:"", */}
                        <div className="offer-price">
                            <input
                                type="number"
                                name="maxRent"
                                onChange={handleDemand}
                                value={demand.maxRent}
                                placeholder="max Rent in DTT"
                                style={{"width":"100%","marginTop":"2%"}}
                            />
                        </div>
                    </div>
            </div>
                </div>
            </Modal.Body>
                    <Modal.Footer>
        <Button variant="secondary"                        
                onClick={(e) => {
                    handleCloseD(true)
                        setDemand({
                            title: "",
                            ville: "",
                            roomNumber: "",
                            description:"",
                            maxRent:"",
                        });
                    setPreviewImageDemand("https://thumbs.dreamstime.com/b/d-house-search-concept-render-houses-magnifying-glass-searching-unique-54337196.jpg");
                    setImageDemand(null);
                }}>
            Close
        </Button>
        <Button variant="primary"
            disabled={
                demand.title &&
                demand.ville &&
                demand.roomNumber &&
                demand.description && 
                demand.maxRent 
                    ? false
                    : true
            }
            onClick={(e)=>{
                handleCloseD(true)
                dispatch(addDemand(demand, imageDemand));
                    setDemand({
                        title: "",
                        ville: "",
                        roomNumber: "",
                        description:"",
                        maxRent:"",
                    });
                setPreviewImageDemand("https://thumbs.dreamstime.com/b/d-house-search-concept-render-houses-magnifying-glass-searching-unique-54337196.jpg");
                setImageDemand(null);
                }}




        
        >
            Save
        </Button>
        </Modal.Footer>
        </Modal>      
</div>
            </div>
        </div>        
        </div>
        
    {/* ******************************************comment ********************* ********************* */}
        {(auth.isAuth || CommentReducer.comments.length !== 0) && (
            <ProfileComment id={id} comments={CommentReducer.comments} />
        )}
</div>
}
</>
)}

export default MyProfile;