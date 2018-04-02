import fetch from 'isomorphic-fetch'

export const fetchRandomUser = () => fetch('https://randomuser.me/api/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(r => r.json())
