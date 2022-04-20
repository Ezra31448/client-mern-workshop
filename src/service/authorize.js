//store token and username => session storage
export const authenticate = (response, next) => {
    if(window!=="undefinded"){
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("token", JSON.stringify(response.data.username));
    }
    next()
}