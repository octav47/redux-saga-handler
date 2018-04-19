import { put } from 'redux-saga/effects'

let _config = {
    watchField: 'error',
    limits: {},
    limitAction: (...args) => ({
        type: '@@redux-saga-handler/LIMIT',
        ...args,
    }),
}

export function handle (fn) {
    let errorCounter = 0

    return function* (action) {
        try {
            yield fn(action)

            errorCounter = 0
        } catch (e) {
            const { watchField, limits } = _config
            const field = e[watchField]

            errorCounter++

            if (errorCounter >= limits[field]) {
                yield put(_config.limitAction())
                errorCounter = 0
            } else {
                if (_config[field]) {
                    yield _config[field](action)
                } else {
                    yield put({ type: '@@redux-saga-handler/UNKNOWN_ERROR' })
                }
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

export const setCode = (code, {
    limit,
    fn,
}) => {
    const { limits } = _config

    _config = {
        ..._config,
        [code]: fn,
        limits: {
            ...limits,
            [code]: limit,
        }
    }
}