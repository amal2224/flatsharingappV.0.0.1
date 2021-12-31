import * as React from 'react';
import "../styles/Navbar.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { HashLink} from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../JS/actions/authActions";

const NavBar=()=> {
const auth = useSelector((state) => state.auth);
const dispatch = useDispatch();
const handleLogout = () => {
    dispatch(LogOut());
};

    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
        <Toolbar className="toollbar">
        <div className="header__left">
            <img style={{width:'75px', height:'40px'}} src="/assets/logoV3.png" alt="myLogo" />
            <Link to="/"><h4>One roof</h4></Link>
        </div> 
        <div id="header__middle">
        {auth.isAuth || localStorage.getItem("token") ? (
            <div className="btnNavbar">
                <Button id="offers">
                    <Link to='/HomePage'>Home</Link>
                </Button>
                <Button id="offers">
                    {/* <Link to="/AllOffers">Offers</Link> */}
                    <HashLink to="#AllOffers">Offers</HashLink>
                </Button>       
                <Button id="demands">
                    {/* <Link to="/AllDemands">Demands</Link> */}
                    <HashLink to="#AllDemands">Demands</HashLink>
                </Button>
                <Button className="profile-btn">
                <img src={auth.user.avatar} alt="avatar"/>
                <Link to={`/Profile/${auth.user._id}`}>
                    <span>{auth.user.fullName}</span>
                </Link>
                </Button>
                <Button onClick={handleLogout} style={{ color: "white" }}>
                    <img style={{width:"30px" , height:"26px", marginLeft:"15px"}} src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png" alt="logout"/>
                </Button>
            </div>
        ) : (
            <>
                <Button id="home">
                    <Link to="/">Home</Link>
                </Button> 
                <Button id="register">
                    <Link to="/register">Register</Link>
                </Button>
                <Button id="login">
                    <Link to="/login">Login</Link>
                </Button>
            </>
        )}
        </div>
        </Toolbar>
        </AppBar>
    </Box>
    );
}
export default NavBar