import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { randomUserReducer } from './reducers'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(combineReducers({
    user: randomUserReducer,
}), {}, composeEnhancers(
    applyMiddleware(sagaMiddleware)
))

sagaMiddleware.run(rootSaga)

export default store
