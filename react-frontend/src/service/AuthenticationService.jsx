import axios from 'axios';

const API_URL = 'http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    loginService(username, password){
        alert('loginService')
        return axios.post(`${API_URL}/login`,
            {headers:{authorization: this.createBasicAuthToken(username, password)}})
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLoginTocken(username, password){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAuthenticationInterceptor(this.createBasicAuthToken(username, password))
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    setupAuthenticationInterceptor(token){
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()){
                    config.heades.authorization = token
                }
                return config
            }
        );
    }

}   

export default new AuthenticationService()
