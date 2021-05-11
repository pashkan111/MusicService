import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {playlistDetailReducer, playListReducer} from './reducers/listsReducer'

const reducer = combineReducers({
    playList: playListReducer,
    playlistDetail: playlistDetailReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;