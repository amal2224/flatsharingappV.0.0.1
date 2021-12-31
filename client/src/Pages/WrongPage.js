import React from "react";
import "../styles/WrongPage.css";
import { ButtonBase } from "@material-ui/core";
import { Link } from 'react-router-dom';

const WrongPage = () => {
return (
    <div className="wrongPage">
        <div className="wrongPage__left">
            <h1>Whooops!</h1>
            <p>Sorry, the page you are looking for doesn't exist</p>
            <ButtonBase>
                <Link to="/">Go back home</Link>
            </ButtonBase>
        </div>
        <div className="wrongPage__right">
            <img src="/assets/404.png" alt="wrongPage" />
        </div>
    </div>
    );
};

export default WrongPage;