import fetch from 'isomorphic-fetch'

export const fetchRandomUser = () => fetch('https://randomuser.me/api/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(r => r.json())

export const request = ({statusCode}) => fetch(`https://httpbin.org/status/${statusCode}`)
    .then(r => {
        if (r.status !== 200) {
            throw {
                code: r.status,
                message: r.statusText,
            }
        }

        return r.json()
    })
