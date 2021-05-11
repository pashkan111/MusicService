import {
        PLAYLIST_REQUEST,
        PLAYLIST_SUCCESS,
        PLAYLIST_FAIL,
        PLAYLIST_DETAIL_REQUEST,
        PLAYLIST_DETAIL_SUCCESS,
        PLAYLIST_DETAIL_FAIL
    } from '../constants/playlistConstants'
    
export const playListReducer = (state = {playlists: []}, action) => {
    switch(action.type) {
        case PLAYLIST_REQUEST:
            return {loading: true, playlists:[]}
        
        case PLAYLIST_SUCCESS:
            return {loading: false, playlists:action.payload}
        
        case PLAYLIST_FAIL:
            return {loading: false, error:action.payload}

        default:
            return state
    }
}



export const playlistDetailReducer = (state = {playlist: {reviews: []}}, action) => {
    switch(action.type) {
        case PLAYLIST_DETAIL_REQUEST:
            return {loading: true, ...state}
        
        case PLAYLIST_DETAIL_SUCCESS:
            return {loading: false, playlist:action.payload}
        
        case PLAYLIST_DETAIL_FAIL:
            return {loading: false, error:action.payload}

        default:
            return state
    }
}

// export default playListReducer