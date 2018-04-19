import { put, takeLatest } from 'redux-saga/effects'
import { setConfig, handle } from '../dist/reduxSagaHandler'

import {
    FETCH_TEST_REQUEST,
    FETCH_TEST_SUCCESS,
    FETCH_TEST_FAILED,
} from './const'

setConfig({
    watchField: 'code',
    403: function* (action) {
        yield new Promise(resolve => setTimeout(resolve, 1000))
        yield put({ type: FETCH_TEST_FAILED })
        yield put(action)
    },
})

function* fn2 (action) {
    yield handle(action, function* () {
        const random = Math.random()

        console.log('random', random)

        if (random < 0.75) {
            throw {
                code: 403,
                message: 'random was less then 0.75',
            }
        }

        yield put({ type: FETCH_TEST_SUCCESS, payload: true })
    })
}

function* mySaga () {
    yield takeLatest(FETCH_TEST_REQUEST, fn2)
}

export default mySaga
