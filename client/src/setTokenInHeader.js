import axios from "axios";

const setToken = () => {
    let token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
        //or
        // axios.defaults.headers.common['Authorization'] = null;
    }
};
export default setToken;