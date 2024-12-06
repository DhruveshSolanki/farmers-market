import { signout } from '../apis/auth.api'

const auth = {
    isAuthenticated() {
        if (typeof window == "undefined")
            return false
        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
            return false

    },
    authenticate(jwt, cb) {
        if (typeof window !== "undefined"){
            sessionStorage.setItem('jwt', JSON.stringify(jwt))

            const expirationTime = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
            setTimeout(() => {
                this.clearJWT();
            }, expirationTime);

        }
            
        cb()

    },
    clearJWT() {
        if (typeof window !== "undefined")
            sessionStorage.removeItem('jwt')
        // cb()
                
        //optional
        signout().then(() => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        })
    }, 
}

export default auth