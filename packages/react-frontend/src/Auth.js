import { useState } from 'react'
import { googleLogout, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

function Auth() {
    const [profile, setProfile] = useState([])

    function handleSignInResponse(response) {
        response = jwtDecode(response.credential)
        setProfile(response)
    }

    function logout() {
        setProfile()
        googleLogout()
    }

    return (
        <div>
            <h1>GoogleLogin</h1>
            {profile ? (
                <div>
                    <img src={profile.picture} />
                    <button onClick={logout}>Logout of account</button>
                </div>
            ) : (
                <GoogleLogin
                    onSuccess={handleSignInResponse}
                    onError={() => {
                        console.log('login failed.')
                    }}
                />
            )}
        </div>
    )
}

export default Auth
