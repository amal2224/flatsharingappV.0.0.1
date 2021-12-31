import './App.css';
import {Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./JS/actions/authActions";

import NavBar from "./Pages/NavBar"
import Footer from "./Pages/Footer"
import SignIn from "./Pages/Auth/SignIn"
import Register from "./Pages/Auth/Register"
import LandingPage from "./Pages/LandingPage"
import WrongPage from "./Pages/WrongPage"
import PrivateRoute from "./PrivateRoute";
import EditProfile from "./Pages/Profile/EditProfile"
import MyProfile from "./Pages/Profile/MyProfile"
import HomePage from './Pages/HomePage';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) dispatch(loadUser());
  },[dispatch,token]);
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/register" component={Register}/> 
        <Route exact path="/login" component={SignIn}/> 
        <PrivateRoute exact path='/EditProfile' component={EditProfile}/>
        <PrivateRoute exact path='/Profile/:id' component={MyProfile}/>
        <PrivateRoute exact path='/HomePage' component={HomePage}/>
        <Route path="*" component={WrongPage} />
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;