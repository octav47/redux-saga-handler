import { put } from 'redux-saga/effects'

let _config = {
    watchField: 'error',
    limits: {},
    limitAction: (...args) => ({
        type: '@@redux-saga-handler/LIMIT',
        ...args,
    }),
}

const handleErrorCounter = {}

export function* handle (action, fn) {
    try {
        yield fn(action)

        console.log('here!')
    } catch (e) {
        const { watchField, limits } = _config
        const field = e[watchField]

        if (!handleErrorCounter[field]) {
            handleErrorCounter[field] = 0
        }

        handleErrorCounter[field]++

        console.log(handleErrorCounter)

        if (handleErrorCounter[field] > 5) {
            yield put(_config.limitAction())
            handleErrorCounter[field] = 0
        } else {
            if (_config[field]) {
                yield _config[field](action)
            } else {
                yield put({ type: '@@redux-saga-handler/UNKNOWN_ERROR' })
            }
        }
    }
}

export const setConfig = newConfig => {
    _config = {
        ..._config,
        ...newConfig,
    }
}
