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

### with redux-saga-handler

#### init

```js
// set config somewhere
import { put } from 'redux-saga/effects'
import { setConfig, setCode } from 'redux-saga-hander'
import { FAILED } from './const'

setConfig({
    watchField: 'code',
})

setCode(403, {
    fn: function* (action) {
        yield new Promise(resolve => setTimeout(resolve, 1000)) // delay
        yield put({ type: FAILED }) // dispatch failed action
        yield put(action) // repeat
    },
    limit: 3, // max repeat count
})
```

#### now rewrite your saga

```js
import { takeLatest, put, call } from 'redux-saga/effects'
import { handle } from 'redux-saga-handler'
import {
    REQUEST,
    SUCCESS,
    FAILED,
} from './const'
import { fetchSomething } from 'Api'

const handler = handle(function* (action) {
    const { payload } = action
    const response = yield call(fetchSomething, payload)

    yield put({ type: SUCCESS, payload: response })
}, {
    failed: ({ type: 'LIMIT_FAILED', payload: 'limit error' })
})

function* saga() {
    yield takeLatest(REQUEST, handler)
}

export default saga
```

### Documentation

__redux-saga-handler__ exports functions

* setConfig
* setCode
* handle

##### function setConfig (newConfig)

extends initial configuration with `newConfig`

```js
// initial configuration
{
    watchField: 'error',
    limits: {},
    limitAction: (...args) => ({
        type: '@@redux-saga-handler/LIMIT',
        ...args,
    }),
}
```

`watchField` -- field name in exception, that was throwed by handler
`limits` -- stores limits for handlers
`limitAction` -- global limit failed action

##### function setCode (code, { fn, limit })
`code` -- number
`fn` -- function* (action)
`limit` -- number

sets handler behavior for specified code

##### handle(fn, options)

`fn` -- function* (action)
`options` -- object

* `options.useGlobalLimitAction (default: false)` -- boolean
tells redux-saga-handler to dispatch global limit failed action too, if handler runs more than specified limit count
* `options.failed` -- action | function
will be dispatched when handler gets error. `option.failed` as function gets in argument exception (that was thrown by handler) and returns action