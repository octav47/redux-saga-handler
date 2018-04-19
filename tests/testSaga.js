import { call, put, takeLatest } from 'redux-saga/effects'

import {
    FETCH_TEST_REQUEST,
    FETCH_TEST_SUCCESS,
    FETCH_TEST_FAILED,
} from './const'

function* fn() {
    try {
        const random = Math.random()

        console.log('random', random)

        if (random < 0.5) {
            throw {
                code: 401,
                message: 'random was less then 0.25',
            }
        }

        yield put({ type: FETCH_TEST_SUCCESS, payload: true })
    } catch (e) {
        yield put({ type: FETCH_TEST_FAILED, error: true, payload: e })
    }
}

function* mySaga() {
    yield takeLatest(FETCH_TEST_REQUEST, fn)
}

export default mySaga
