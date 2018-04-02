import { call, put, takeLatest } from 'redux-saga/effects'

import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
} from './const'

import { fetchRandomUser } from './api'

function* fetch() {
    try {
        const data = yield call(fetchRandomUser)

        console.log(data.results[0])

        yield put({ type: FETCH_USER_SUCCESS, payload: data.results[0] })
    } catch (e) {
        yield put({ type: FETCH_USER_FAILED, payload: e })
    }
}

function* mySaga() {
    yield takeLatest(FETCH_USER_REQUEST, fetch)
}

export default mySaga
