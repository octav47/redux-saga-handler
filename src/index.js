import 'babel-polyfill'
import { put } from 'redux-saga/effects'

class ReduxSagaHandler {
    constructor () {

    }
}

let _config = {
    handle: () => {},
}

export function* handle (action, fn) {
    try {
        yield fn(action)
    } catch (e) {
        if (_config[e.code]) {
            yield _config[e.code](action)
        } else {
            put({ type: '@@redux-saga-handler/UNKNOWN_ERROR' })
        }
    }
}

export const setConfig = newConfig => {
    _config = {
        ..._config,
        ...newConfig,
    }
}
