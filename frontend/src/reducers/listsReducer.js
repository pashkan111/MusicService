import {
        PLAYLIST_REQUEST,
        PLAYLIST_SUCCESS,
        PLAYLIST_FAIL,

        PLAYLIST_CREATING_REQUEST,
        PLAYLIST_CREATING_SUCCESS,
        PLAYLIST_CREATING_FAIL,

        PLAYLIST_DELETING_REQUEST,
        PLAYLIST_DELETING_SUCCESS,

        SEARCHING_SONG
    } from '../constants/playlistConstants'
    
export const playListReducer = (state = {playlists: []}, action) => {
    switch(action.type) {
        case PLAYLIST_REQUEST:
            return {loading: true, ...state}
        
        case PLAYLIST_SUCCESS:
            return {loading: false, playlists:action.payload}
          
        case PLAYLIST_FAIL:
                return {loading: false, error:action.payload}

        case PLAYLIST_DELETING_REQUEST:
            return {loading: true, ...state}
               
        case PLAYLIST_DELETING_SUCCESS:
            return {loading: false, playlists: state.playlists.filter(item => item.id !== action.payload)}

        case PLAYLIST_CREATING_REQUEST:
            return {loading: true, ...state}

        case PLAYLIST_CREATING_SUCCESS:
            return {loading: false,
                playlists: [...state.playlists, action.payload]
             }

        case PLAYLIST_CREATING_FAIL:
            return {loading: false, error: action.payload}
       
        default:
            return state
    }
}



export const SearchSongReducer = (state = {term: ''}, action) => {
    switch(action.type) {
        case SEARCHING_SONG:
            return { 
                term: '',
                term: action.payload
            }
            
        default:
            return state
    }
}