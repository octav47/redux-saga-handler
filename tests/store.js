import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { middleware as sagaHandlerMiddleware, setConfig } from '../src'
import { randomUserReducer } from './reducers'
import rootSaga from './rootSaga'

setConfig({
    handle: (store, next, action) => {
        if (action.error) {
            const { payload } = action

            if (payload.code === 404) {
                console.log(store, next, action)
            }
        }
    }
})

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(combineReducers({
    user: randomUserReducer,
}), {}, composeEnhancers(
    applyMiddleware(sagaMiddleware, sagaHandlerMiddleware)
))

sagaMiddleware.run(rootSaga)

export default store
