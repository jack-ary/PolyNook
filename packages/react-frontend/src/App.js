import './App.css'
import Search from './Search.js'
import Output from './OutputComponent.js'
import React, { useState } from 'react'
import Auth from './Auth.js'

const Banner = () => {
    return <div className="banner">Poly Nook</div>
}

const SearchDatabase = (searchTerm) => {
    const promise = fetch('http://localhost:8000/studyspaces/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchTerm),
    })

    return promise
}

function App() {
    const [bodyText, setBodyText] = useState('')
    const [apiCallSuccessful, setApiCallSuccessful] = useState(false)
    const [objectList, setObjectList] = useState([])
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
                                AC: object.AC,
                                Capacity: object.Capacity,
                                DegreeLevel: object.DegreeLevel,
                                Major: object.Major,
                                Computer: object.Computer,
                                id: object._id,
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

    return (
        <div className="App">
            <Banner />
            <Search handleSubmit={handleSearchSubmit} />
            <div className="content">
                <h1>Welcome to Poly Nook</h1>
                <p>Your resource for finding study spaces!</p>
                <p>{bodyText}</p>
                {apiCallSuccessful ? (
                    <Output objectList={objectList} />
                ) : (
                    <p></p>
                )}
            </div>
            <Auth />
        </div>
    )
}

export default App
