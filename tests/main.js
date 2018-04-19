import * as Const from './const'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { randomUserReducer } from './reducers'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers({
    user: randomUserReducer,
}), composeEnhancers(
    applyMiddleware(sagaMiddleware)
))

sagaMiddleware.run(rootSaga)

const config = {
    test: Const.FETCH_TEST_REQUEST,
    200: Const.FETCH_200_REQUEST,
}

Object.keys(config).forEach(key => {
    const btn = document.getElementById(`btn-code-${key}`)

    btn.addEventListener('click', () => {
        store.dispatch({
            type: config[key],
        })
    })
})

// store.subscribe(() => {
//     const state = store.getState()
//
//     console.log(state)
// })
