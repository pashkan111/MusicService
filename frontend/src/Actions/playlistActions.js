import {
    PLAYLIST_REQUEST,
    PLAYLIST_SUCCESS,
    PLAYLIST_FAIL,
    
    PLAYLIST_CREATING_REQUEST,
    PLAYLIST_CREATING_SUCCESS,
    PLAYLIST_CREATING_FAIL,

    PLAYLIST_DELETING_REQUEST,
    PLAYLIST_DELETING_SUCCESS,
    PLAYLIST_DELETING_FAIL,

    SEARCHING_SONG

} from '../constants/playlistConstants'
import axios from 'axios'

export const playlistActions = () => async (dispatch, getState) => {
    try {
        dispatch({type: PLAYLIST_REQUEST})
        const {userLogin: {userInfo}} = getState()
        const {data} = await axios({
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
             },
            url:'http://127.0.0.1:8000/api/playlists/'
        })
        dispatch({
            type: PLAYLIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PLAYLIST_FAIL,
            payload: error.responce && error.responce.data.message
            ? error.responce.data.message
            : error.message
        })
    }
}




export const createPlaylist = (name) => async(dispatch, getState) => {
    try{
    dispatch({
        type: PLAYLIST_CREATING_REQUEST
    })
    const {userLogin: {userInfo}} = getState()

    const {data} = await axios({
        method:"POST",
        url: "http://127.0.0.1:8000/api/create-playlist/",
        data: {
            'name': name
        },
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userInfo.token}`
         }
        })
        dispatch({
            type: PLAYLIST_CREATING_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PLAYLIST_FAIL,
            payload: error.responce && error.responce.data.message
            ? error.responce.data.message
            : error.message
        })
    }
}

export const deletePlaylistAction = (id) => async(dispatch, getState) => {
    try{
        const {userLogin: {userInfo}} = getState()
        dispatch({
            type: PLAYLIST_DELETING_REQUEST,
        })         
             
        axios({
            method:"POST",
            url: "http://127.0.0.1:8000/api/delete-playlist/",
            data: {
                'id': id
            },
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
             }
            })
            
        dispatch({
            type: PLAYLIST_DELETING_SUCCESS,
            payload: id
        })    

    } catch(error) {
        dispatch({
            type: PLAYLIST_DELETING_FAIL,
            payload: error.responce
        })
    }
}


export const searchItem = (term) => (dispatch) => {
    dispatch({
        type: SEARCHING_SONG,
        payload: term
    })
    
}
