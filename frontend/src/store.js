import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {playlistDetailReducer, playListReducer, createPlaylistReducer, deletePlaylistReducer} from './reducers/listsReducer'
import {
    loginReducer, registerReducer, userDetailReducer, userResetReducer
} from './reducers/userReducer'

const reducer = combineReducers({
    playList: playListReducer,
    // playlistDetail: playlistDetailReducer,
    userLogin: loginReducer,
    userRegister: registerReducer,
    userDetails: userDetailReducer,
    userReset: userResetReducer,
    createPlaylist: createPlaylistReducer,
    // deletedPlaylist: deletePlaylistReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;