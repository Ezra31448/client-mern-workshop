//store token and username => session storage
export const authenticate = (response, next) => {
    if(window!=="undefinded"){
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("username", JSON.stringify(response.data.username));
    }
    next()
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
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"));
        } else {
            return false;
        }
    }
};