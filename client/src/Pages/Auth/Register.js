import React,  { useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from "react-router";
// i don't konw where i will put this --> "removeAuthErr"
import { loadUser, registerUser } from "../../JS/actions/authActions";
import {Input,InputLabel,FormControl,Radio,RadioGroup,FormControlLabel,InputAdornment,IconButton} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "../../styles/Register.css"

const Register = () => {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        facebook: "",
        twitter: "",
        instagram: "",
        avatar: "",
        sex:""
    });
    const [showPassword, setShowPassword] = useState(false);

    const auth = useSelector((state) => state.auth);
    const history=useHistory();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (auth.isAuth) {
            dispatch(loadUser());
            history.push("/EditProfile");
        }
    }, [auth.isAuth, dispatch ,history]);
    // here is the probleme set inside useEffect
    useEffect(() => {
        if (user.sex === "male") {
            setUser({...user,avatar: "https://www.unionmedicalcentre.com.au/wp-content/uploads/2019/04/avatar-male.jpg",});
        } else {
            if (user.sex === "female") {
                setUser({...user,avatar: "https://club-du-lundi.ch/wp-content/uploads/2019/03/avatar-femme-e1551973260967.jpg",});
            }
        }
    }, [user.sex,user]);

    const handleUser = (e) => {
        setUser({ 
            ...user, [e.target.name]: e.target.value 
        })};
    const handleRegister=(e)=>{
        e.preventDefault();
        dispatch(registerUser(user));
    };
    return (
    <div className="register-wrap">
    <h1 className="tab">Sign UP</h1>
    <div className="hr"></div>
    <form className="register-form">
        {/* fullName */}
    <FormControl id="register-Control">
            <InputLabel id="label">Your fullName</InputLabel>
            <Input
            error={
                    auth.error.filter((el) => el.msg === "please check your fullName").length !==0
                    ? true
                    : false
                }
            className="Register-input"
            type="text"
            required
            name="fullName"
            onInput={handleUser}
            value={user.fullName}
            />
            <p
                className={
                auth.error.filter((el) => el.msg === "please check your fullName").length !==0
                    ? "errColor"
                    : "error_register"
                }
            >
                *must contain only letters
            </p>
    </FormControl>
        {/* Email */}
    <FormControl id="register-Control">
            <InputLabel id="label">Your email</InputLabel>
            <Input
            error={
                    auth.error.filter((el) => el.msg === "please check your email").length !==0
                    ? true
                    : false
                }
            className="Register-input"
            type="email"
            required
            name="email"
            onInput={handleUser}
            value={user.email}
            />
            <p
                className={
                auth.error.filter((el) => el.msg === "please check your email").length !==0
                    ? "errColor"
                    : "error_register"
                }
            >
                *Enter a valid email address
            </p>
    </FormControl>
        {/* password */}
    <FormControl id="register-Control">
            <InputLabel id="label"> Your password</InputLabel>
            <Input
            error={
                    auth.error.filter((el) => el.msg === "please check your password").length !==0
                    ? true
                    : false
                }
            className="Register-input"
                type={showPassword ? "text" : "password"}
            required
            name="password"
            onInput={handleUser}
            value={user.password}

            endAdornment={
                <InputAdornment position="end">
                    <IconButton onClick={(e) => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
            />
            <p
                className={
                auth.error.filter((el) => el.msg === "please check your email").length !==0
                    ? "errColor"
                    : "error_register"
                }
            >
                *must contain at least 6 characters
            </p>
    </FormControl>
        {/* gender */}
    <FormControl id="gender-Control" component="fieldset">
            <div id="label-G">Gender:</div>
            <RadioGroup
                id="radioGroup"
                row
                aria-label="sex"
                name="sex"
                onChange={handleUser}
            >
            <FormControlLabel
                className="btnRadio"
                value="male"
                control={<Radio size="small" />}
                label="Male"
            />
            <FormControlLabel
                value="female"
                control={<Radio size="small" />}
                label="Female"
            />
            </RadioGroup>
    </FormControl>
    <input className="group" type="submit" value="Sign Up" onClick={handleRegister} />
    </form>
    </div>
    )
}
export default Register