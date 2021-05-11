import {
    PLAYLIST_REQUEST,
    PLAYLIST_SUCCESS,
    PLAYLIST_FAIL,
    PLAYLIST_DETAIL_REQUEST,
    PLAYLIST_DETAIL_SUCCESS,
    PLAYLIST_DETAIL_FAIL
} from '../constants/playlistConstants'
import axios from 'axios'

export const playlistActions = () => async (dispatch) => {
    try {
        dispatch({type: PLAYLIST_REQUEST})
        const {data} = await axios.get('http://127.0.0.1:8000/api/playlists/')
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

export const playlistDetailActions = (id) => async (dispatch) => {
    try {
        dispatch({type: PLAYLIST_DETAIL_REQUEST})
        const {data} = await axios.get(`http://127.0.0.1:8000/api/playlist/${id}`)
        dispatch({
            type: PLAYLIST_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PLAYLIST_DETAIL_FAIL,
            payload: error.responce && error.responce.data.message
            ? error.responce.data.message
            : error.message
        })
    }
}
