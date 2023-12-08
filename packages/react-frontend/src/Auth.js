import { googleLogout, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

function Auth(props) {
    function handleSignInResponse(response) {
        response = jwtDecode(response.credential)
        props.setProfile(response)
    }

    function logout() {
        props.setProfile(null)
        googleLogout()
    }

    return (
        <div>
            {props.profile ? (
                <div
                    style={{
                        display: 'flex-box',
                        justifyContent: 'center',
                    }}
                >
                    <img src={props.profile.picture} />
                    <div>
                        <p>Welcome, {props.profile.name}</p>
                        <button onClick={logout}>Logout of account</button>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '30px',
                        lineHeight: '30px',
                    }}
                >
                    <h4
                        style={{
                            display: 'inline-block',
                            padding: '0px 20px',
                            justifyContent: 'center',
                            margin: '0',
                            fontSize: '20px',
                        }}
                    >
                        Please, Sign In To Use The Full PolyNook Service:
                    </h4>
                    <GoogleLogin
                        style={{
                            display: 'inline-block',
                            padding: '0px 20px',
                            justifyContent: 'center',
                        }}
                        onSuccess={handleSignInResponse}
                        onError={() => {
                            console.log('login failed.')
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default Auth
