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

export const createSagaHandler = config => {

}

export const middleware = store => {
    return next => {
        return action => {
            if (action['@@redux-saga/SAGA_ACTION']) {
                _config.handle(store, next, action)
            }

            next(action)
        }
    }
}
