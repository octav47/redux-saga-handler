import { put, takeLatest } from 'redux-saga/effects'
import { setConfig, setCode, handle } from '../dist/reduxSagaHandler'

import {
    FETCH_TEST_REQUEST,
    FETCH_TEST_SUCCESS,
    FETCH_TEST_FAILED,
} from './const'

setConfig({
    watchField: 'code',
})

setCode(403, {
    fn: function* (action) {
        yield new Promise(resolve => setTimeout(resolve, 1000))
        yield put({ type: FETCH_TEST_FAILED })
        yield put(action)
    },
    limit: 3,
})

const handler = handle(function* () {
    const random = Math.random()

    console.log('random', random)

    if (random < 0.75) {
        throw {
            code: 403,
            message: 'random was less then 0.75',
        }
    }

    yield put({ type: FETCH_TEST_SUCCESS, payload: true })
}, {
    useGlobalLimitAction: true,
    failed: ({ type: 'FETCH_TEST_LIMIT_FAILED', payload: 'error' })
})

function* fn2 (action) {
    yield handler(action)
}

function* mySaga () {
    yield takeLatest(FETCH_TEST_REQUEST, fn2)
}

export default mySaga
