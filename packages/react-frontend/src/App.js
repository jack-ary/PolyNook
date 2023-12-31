import './App.css'
import Search from './Search.js'
import Output from './OutputComponent.js'
import React, { useState, useEffect } from 'react'
import Auth from './Auth.js'
import Registrations from './Registrations.js'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const Banner = () => {
    return <div className="banner">PolyNook</div>
}

const SearchSection = (props) => {
    return (
        <div>
            <Search handleSubmit={props.handleSearchSubmit} />
            <div className="content">
                <h1>Welcome to Poly Nook</h1>
                <p>Your resource for finding study spaces!</p>
                <p>{props.bodyText}</p>
                {props.apiCallSuccessful ? (
                    <Output
                        objectList={props.objectList}
                        profile={props.profile}
                    />
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    )
}
const GetRegistrations = (email) => {
    const promise = fetch('https://polynook.azurewebsites.net/registrations/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })

    return promise
}

const handleProfileChange = (profile, setRegistrations_list) => {
    if (profile === null) {
        return
    }

    GetRegistrations(profile.email)
        .then((response) => {
            if (response.status === 200) {
                response
                    .json()
                    .then((value) => {
                        console.log(value)
                        const newList = value.map((object) => ({
                            BuildingName: object.Building,
                            RoomNumber: object.RoomNumber,
                            CurrentAvailability: object.CurrentAvailability,
                            Schedule: object.Schedule,
                            AC: object.AirConditioning,
                            Capacity: object.Capacity,
                            DegreeLevel: object.Degree,
                            Major: object.Major,
                            Computer: object.Computer,
                            id: object._id,
                            Rating: object.Rating,
                        }))
                        setRegistrations_list(newList)
                    })
                    .catch((error) => console.log(error))
            } else {
                return
            }
        })
        .catch((error) => console.log(error))
    return
}

const SearchDatabase = (searchTerm) => {
    const promise = fetch('https://polynook.azurewebsites.net/studyspaces/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchTerm),
    })

    return promise
}

function App() {
    const [bodyText, setBodyText] = useState()
    const [profile, setProfile] = useState(null)
    const [apiCallSuccessful, setApiCallSuccessful] = useState(false)
    const [objectList, setObjectList] = useState([])
    const [darkMode, setDarkMode] = useState(false)
    const [registrations_list, setRegistrations_list] = useState([])

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode)
    }, [darkMode])

    useEffect(() => {
        handleProfileChange(profile, setRegistrations_list)
    }, [profile])

    const refreshRegistrations = () => {
        handleProfileChange(profile, setRegistrations_list)
    }

    const handleSearchSubmit = (searchTerm) => {
        console.log('We searched!')
        SearchDatabase(searchTerm)
            .then((response) => {
                if (response.status === 200) {
                    response
                        .json()
                        .then((value) => {
                            console.log(value)
                            setApiCallSuccessful(true)
                            setBodyText('Search Completed')
                            const newList = value.map((object) => ({
                                BuildingName: object.Building,
                                RoomNumber: object.RoomNumber,
                                CurrentAvailability: object.CurrentAvailability,
                                Schedule: object.Schedule,
                                AC: object.AirConditioning,
                                Capacity: object.Capacity,
                                DegreeLevel: object.Degree,
                                Major: object.Major,
                                Computer: object.Computer,
                                id: object._id,
                                Rating: object.Rating,
                            }))
                            setObjectList(newList)
                        })
                        .catch((error) => console.log(error))
                    setApiCallSuccessful(false)
                } else if (response.status === 404) {
                    setApiCallSuccessful(false)
                    setBodyText('Not Found')
                } else {
                    setApiCallSuccessful(false)
                    setBodyText('An Unknown Error Occurred')
                }
            })
            .catch((error) => console.log(error))
        return
    }
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
            <div className="dark-mode-toggle" onClick={toggleDarkMode}>
                {darkMode ? '☀️' : '🌙'}
            </div>
            <Banner />
            <Auth profile={profile} setProfile={setProfile} />
            <Router>
                <nav
                    style={{
                        padding: '30px 10%',
                        textAlign: 'center',
                    }}
                >
                    <ul>
                        <li
                            style={{
                                display: 'inline-block',
                                padding: '0px 50px',
                                fontSize: '25px',
                                fontWeight: 'bold',
                            }}
                        >
                            <Link to="/" className="nav-button">
                                Search
                            </Link>
                        </li>
                        <li
                            style={{
                                display: 'inline-block',
                                padding: '0px 40px',
                                fontSize: '25px',
                                fontWeight: 'bold',
                            }}
                        >
                            <Link to="/registrations" className="nav-button">
                                Registrations
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route
                        exact
                        path="/registrations"
                        element={
                            <Registrations
                                profile={profile}
                                registrations={registrations_list}
                                getRegistrations={refreshRegistrations}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/"
                        element={
                            <SearchSection
                                handleSearchSubmit={handleSearchSubmit}
                                apiCallSuccessful={apiCallSuccessful}
                                objectList={objectList}
                                bodyText={bodyText}
                                profile={profile}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    )
}

export default App
