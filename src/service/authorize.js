//store token and username => session storage
export const authenticate = (response) => {
    if(window!=="undefinded"){
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("username", JSON.stringify(response.data.username));
    }
    //next()
}
//get token data
export const getToken = () => {
    if(window!== "undefined") {
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"));
        } else {
            return false;
        }
    }
};

//get user data

export const getUser = () => {
    if(window!== "undefined") {
        if(sessionStorage.getItem("username")){
            return JSON.parse(sessionStorage.getItem("username"));
        } else {
            return false;
        }
    }
};

export const logout = () => {
    if(window!== "undefined") {
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("username")
    }
    console.log("log out");
    // callback();
};