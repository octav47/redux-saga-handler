import { fork, all } from 'redux-saga/effects'
import randomUserSaga from './randomUserSaga'

export default function* rootSaga () {
    yield all([
        fork(randomUserSaga),
    ])
}
