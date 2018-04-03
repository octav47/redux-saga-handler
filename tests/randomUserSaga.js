import fetch from 'isomorphic-fetch'
import { call, put, takeLatest } from 'redux-saga/effects'

import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
} from './const'

export const fetchRandomUser = () => fetch('https://randomuser.me/api1/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(r => {
    if (r.status !== 200) {
        throw {
            code: r.status,
            message: r.statusText,
        }
    }

    return r.json()
})

function* getRandomUser() {
    try {
        const data = yield call(fetchRandomUser)

        yield put({ type: FETCH_USER_SUCCESS, payload: data.results[0] })
    } catch (e) {
        yield put({ type: FETCH_USER_FAILED, error: true, payload: e })
    }
}

function* mySaga() {
    yield takeLatest(FETCH_USER_REQUEST, getRandomUser)
}

export default mySaga
