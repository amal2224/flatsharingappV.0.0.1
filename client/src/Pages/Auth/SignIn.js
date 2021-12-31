import React ,{useEffect, useState }from 'react';
import {
    IconButton,
    Input,
    InputLabel,
    InputAdornment,
    FormControl
} from "@material-ui/core";
import { useHistory } from "react-router";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, SignInUser} from "../../JS/actions/authActions";
import "../../styles/Register.css"

const SignIn = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history=useHistory();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.isAuth) {
            dispatch(loadUser());
            history.push(`/`);
    }
    }, [dispatch,history,auth.isAuth,auth.user._id]);
    const handleUser = (e) => {
        setUser({ 
            ...user, [e.target.name]: e.target.value 
        })};
    
    const handleLogin=(e)=>{
        e.preventDefault();
        dispatch(SignInUser(user));
        // dispatch(removeAuthErr());
    };

    return (
        <div className="register-wrap-signIn">
            <h1 className="tab">Sign IN</h1>
            <div className="hr"></div>
            <form className="register-form">
            {/* email */}
            <FormControl id="register-Control">
                    <InputLabel id="label">Email</InputLabel>
                    <Input
                        error={
                        auth.error.filter((el) => el.msg === "Please register before").length !==0 
                        ||
                        auth.error.filter((el) => el.msg === "please check your email").length !== 0
                        ? true
                        : false
                        }
                    className="Register-input"
                    type="email"
                    name="email"
                    onChange={handleUser}
                    value={user.email}
                    />
                {auth.error.filter((el) => el.msg === "please check your email" 
                || el.msg === "Please register before"
                ).length !==0 
                && 
                (<p className="errColor">Please enter a valid email</p>)}
            </FormControl>
            {/* password */}
            <FormControl id="register-Control">
                <InputLabel id="label">Password</InputLabel>
                <Input
                    error={
                    auth.error.filter((el) => el.msg === "Password error").length !== 0
                    ? true
                    : false
                }
                className="Register-input"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleUser}
                value={user.password}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton onClick={(e) => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    </InputAdornment>
                }
                />
                {auth.error.filter((el)=>el.msg ==="Password error"||el.msg === "please check your password").length !==0
                && <p className="errColor">Wrong password</p>}
            </FormControl>
            <div id="marginSignin"></div>
                <input className="group" type="submit" value="Sign Up" onClick={handleLogin} />
            </form>
        </div>
    )
}
export default SignIn