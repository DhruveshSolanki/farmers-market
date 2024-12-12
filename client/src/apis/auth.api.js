const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : '/auth';

const signin = async (user) => {
    try {
        let response = await fetch(API_URL + '/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const signout = async () => {
    try {
        let response = await fetch(API_URL + '/signout/', { method: 'GET' })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { signin, signout }
