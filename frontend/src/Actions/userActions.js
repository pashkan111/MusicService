import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET
} from '../constants/userConstance'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch ({
            type: USER_LOGIN_REQUEST
        })
        const {data} = await axios({
            method: "POST",
            url: "http://127.0.0.1:8000/api/users/login/",
            headers: { "Content-Type": "application/json" },
            data: {
                'email': email,
                'password': password
            }
        })
        console.log(data)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => async (dispatch) => {

        localStorage.removeItem('userInfo')
        dispatch ({type: USER_LOGIN_LOGOUT})
        dispatch ({type: USER_DETAIL_RESET})
} 

export const register = (email, username, password, password2) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const body = {
            'email': email,
            'name': username,
            'password': password,
            'password2': password2,
        }
        const {data} = await axios({
            method: "POST",
            url: "http://127.0.0.1:8000/api/users/register/",
            headers: { "Content-Type": "application/json" },
            data: body
        })
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message
        })
    }
}

export const userDetail = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAIL_REQUEST
        })
        const {userLogin: {userInfo}} = getState()

        const {data} = await axios({
            method: "GET",
            url: `http://127.0.0.1:8000/api/users/`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
             },
        })
        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })
    } catch {
        dispatch({
            type: USER_DETAIL_FAIL
        })
    }
}



export const userUpdateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()

        const {data} = await axios({
            method: "PUT",
            url: `http://127.0.0.1:8000/api/users/update-profile/`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
             },
             data: user
        })
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch {
        dispatch({
            type: USER_UPDATE_FAIL
        })
    }
}