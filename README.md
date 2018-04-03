# redux saga handler

your saga maybe smth like

```js
import { takeLatest, put, call } from 'redux-saga/effects'
import {
    REQUEST,
    SUCCESS,
    FAILED,
} from './const'
import { fetchSomething } from 'Api'


function* getSomething({ payload }) {
    try {
        const response = yield call(fetchSomething, payload)

        yield put({ type: SUCCESS, payload: response })
    } catch (e) {
        yield put({ type: FAILED, payload: e })
    }
}

function* saga() {
    yield takeLatest(REQUEST, getSomething)
}

export default saga

```

with redux-saga-handler

```js
// set config somewhere
import { put } from 'redux-saga/effects'
import { setConfig } from 'redux-saga-hander'

setConfig({
    403: action => {
        put({ type: 'ERROR_FOR_EVERY_403' })
    }
})
```

know rewrite your saga
```js
import { takeLatest, put, call } from 'redux-saga/effects'
import { handle } from 'redux-saga-handler'
import {
    REQUEST,
    SUCCESS,
    FAILED,
} from './const'
import { fetchSomething } from 'Api'


function* getSomething(action) {
    yield handle(action, () => {
        const { payload } = action
        const response = yield call(fetchSomething, payload)
        
        yield put({ type: SUCCESS, payload: response })
    })
    
    // every time you get 403,
    // action { type: 'ERROR_FOR_EVERY_403' } will be put to store
}

function* saga() {
    yield takeLatest(REQUEST, getSomething)
}

export default saga
```
