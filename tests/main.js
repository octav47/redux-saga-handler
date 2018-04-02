import { FETCH_USER_REQUEST } from './const'

import store from './store'

const config = {
    'fetch-random-user': true,
}

Object.keys(config).forEach(key => {
    const btn = document.getElementById(key + '-btn')
    const result = document.getElementById(key + '-result')

    btn.addEventListener('click', () => {
        store.dispatch({
            type: FETCH_USER_REQUEST,
        })
    })
})

store.subscribe(() => {
    const state = store.getState()

    console.log(state)
})
