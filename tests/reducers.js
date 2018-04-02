import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
} from './const'

export const randomUserReducer = (state = {}, action) => {
    const { type, payload } = action

    if (type === FETCH_USER_REQUEST) {
        return {
            ...state,
            fetching: true,
        }
    }

    if (type === FETCH_USER_SUCCESS) {
        return {
            ...state,
            fetching: false,
            error: null,
            data: payload,
        }
    }

    if (type === FETCH_USER_FAILED) {
        return {
            ...state,
            fetching: false,
            error: payload,
        }
    }

    return state
}
