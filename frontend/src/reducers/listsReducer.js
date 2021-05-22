import {
        PLAYLIST_REQUEST,
        PLAYLIST_SUCCESS,
        PLAYLIST_FAIL,

        PLAYLIST_DETAIL_REQUEST,
        PLAYLIST_DETAIL_SUCCESS,
        PLAYLIST_DETAIL_FAIL,

        PLAYLIST_CREATING_REQUEST,
        PLAYLIST_CREATING_SUCCESS,
        PLAYLIST_CREATING_FAIL,

        PLAYLIST_DELETING_REQUEST,
        PLAYLIST_DELETING_SUCCESS,
        PLAYLIST_DELETING_FAIL
    } from '../constants/playlistConstants'
    
export const playListReducer = (state = {playlists: []}, action) => {
    switch(action.type) {
        case PLAYLIST_REQUEST:
            return {loading: true, playlists:[]}
        
        case PLAYLIST_SUCCESS:
            return {loading: false, playlists:action.payload}
          
        case PLAYLIST_FAIL:
                return {loading: false, error:action.payload}

        case PLAYLIST_DELETING_REQUEST:
            return {delLoading: true, ...state}
               
        case PLAYLIST_DELETING_SUCCESS:
            return {delLoading: false, playlists: state.playlists.filter(item => item.id !== action.payload)}

        case PLAYLIST_DELETING_FAIL:
            return {delLoading: false, error: action.payload}
       
        default:
            return state
    }
}



export const playlistDetailReducer = (state = {playlist: []}, action) => {
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

export const createPlaylistReducer = (state = {}, action) => {
    switch(action.type) {
        case PLAYLIST_CREATING_REQUEST:
            return {loading: true, state: {}}

        case PLAYLIST_CREATING_SUCCESS:
            return {loading: false, playlist: action.payload }

        case PLAYLIST_CREATING_FAIL:
            return {loading: false, error: action.payload}

        default: 
            return state
    }
}


