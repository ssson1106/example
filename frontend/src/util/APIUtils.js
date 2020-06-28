import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import axios from 'axios';

const request = (options) => {
    const headers = new Headers({
        'Content-type' : 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append('Authorization', 'Bearer '+localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    axios(options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok){
                    return Promise.reject(json);
                }
                return json;
            })
        )
    ;
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}