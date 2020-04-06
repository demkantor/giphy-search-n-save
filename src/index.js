import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from "redux-saga/effects";
import Axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('SET_SEARCH', addGiphy);
    yield takeEvery('DISPLAY_FAV', getGiphy);
    yield takeEvery('ADD_FAV', postGiphy);
    yield takeEvery('REMOVE_FAV', deleteGiphy);
    yield takeEvery('CHANGE_FAV', putGiphy);
}

function* addGiphy(giphy) {
    const searchResponse = yield Axios.get(`/api/search/${giphy.payload.search}`);
    //console.log("giphy payload", giphy.payload)
    yield put({type: 'GIF_SEARCH', payload: searchResponse.data})
    //console.log('its snowing outside now', searchResponse.data)
}

function* getGiphy(){
    const gimmieGif = yield Axios.get('/api/favorite');
    //console.log('this saga came from favorite/GET bringing: ', gimmieGif.data)
    yield put({type: 'SET_FAV', payload: gimmieGif.data})
}

function* postGiphy(fav) {
    //console.log('in saga post', fav.payload);
    try {
        yield Axios.post('/api/favorite', fav.payload);
        yield put({type: 'DISPLAY_FAV'})
    } catch(error){
        console.log(error);
    }
}

function* deleteGiphy(remove) {
    //console.log("in saga delete with: ", remove.payload);
    try {
        yield Axios.delete(`/api/favorite/${remove.payload}`);
        yield put({type: 'DISPLAY_FAV'})
    } catch(error){
        console.log(error);
    }
}

function* putGiphy(edit) {
  //console.log("in saga PUT with: ", edit.payload.sendId);
  try {
    yield Axios.put(`/api/favorite/${edit.payload.sendId}`, edit.payload);
    yield put({ type: "DISPLAY_FAV" });
  } catch (error) {
    console.log(error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


const searchReducer = (state = {}, action) => {
    switch(action.type){
        case 'GIF_SEARCH':
            return state = action.payload;
        default:
            return state;
    }
}

const categoryReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_FAV':
            return action.payload;
        default:
            return state;
    }
}

// Creates one store that all components can use
const storeInstance = createStore(
    combineReducers({
        searchReducer,
        categoryReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('react-root'));


