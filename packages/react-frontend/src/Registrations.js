import { useState } from 'react'
import { googleLogout, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

function Registrations() {
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
                <div
                    style={{
                        display: 'flex-box',
                    }}
                >
                    <img src={profile.picture} />
                    <div>
                        <p>Logged in as {profile.email}</p>
                        <button onClick={logout}>Logout of account</button>
                    </div>
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

export default Registrations
