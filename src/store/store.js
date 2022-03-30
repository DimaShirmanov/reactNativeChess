import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const appReducer = combineReducers({
    ...rootReducer,
});

// const sagaMiddleware = createSagaMiddleware();

// const middleWare = [sagaMiddleware];

const store = createStore(appReducer);

// sagaMiddleware.run(rootSaga);

export default store;