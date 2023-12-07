import React from 'react'
import './RegisterButton.css'
import StarRating from './StarRating'

function OutputComponent({ objectList, userEmail }) {
    const alertMessage = (input) => {
        alert(input)
    }
    const registerForSpace = (roomId) => {
        const promise = fetch(`http://localhost:8000/registerSpace/${roomId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return promise
    }

    const sendRating = (value, roomId, email) => {
        const promise = fetch(
            `http://localhost:8000/sendRating/${roomId}/${value}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            }
        )
        return promise
    }

    function handleRegisterClick(event) {
        const roomId = event.target.getAttribute('data-room-id')
        registerForSpace(roomId)
            .then((response) => {
                if (response.status === 200) {
                    alertMessage('Registered!')
                    console.log('200 response')
                } else {
                    alertMessage('An error occured: ' + response.status)
                }
            })
            .catch((error) => console.log(error))
        return
    }

    function handleStarClick(value, roomId) {
        sendRating(value, roomId, userEmail)
            .then((response) => {
                if (response.status === 200) {
                    console.log('200 response')
                } else {
                    alertMessage('An error occured: ' + response.status)
                }
            })
            .catch((error) => console.log(error))
        return
    }

    const renderedObjects = objectList.map((object, index) => (
        <div key={index} className="outputObject">
            <h3>
                <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(
                        object.BuildingName
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {object.RoomNumber + ', ' + object.BuildingName}
                </a>
            </h3>
            <p>{'Schedule: ' + (object.Schedule ? object.Schedule : 'NA')}</p>
            <p>
                {'Current Availability: ' +
                    (object.CurrentAvailability
                        ? object.CurrentAvailability
                        : 'NA')}
            </p>
            <p>{'Capacity: ' + (object.Capacity ? object.Capacity : 'NA')}</p>
            <p>
                {'Degree Level: ' +
                    (object.DegreeLevel ? object.DegreeLevel : 'NA')}
            </p>
            <p>{'Major: ' + (object.Major ? object.Major : 'NA')}</p>
            {object.Computer ? <p>Has Computers</p> : <p>No Computers</p>}
            {object.AC ? <p>Air Conditioned</p> : <p>No AC</p>}
            <div>
                <StarRating roomId={object.id} onStarClick={handleStarClick} />
            </div>
            <button
                className="button-3"
                id="registerButton"
                data-room-id={object.id}
                onClick={handleRegisterClick}
            >
                Register
            </button>
        </div>
    ))

    return (
        <div className="outputStyle">
            <div className="outputWrapper">{renderedObjects}</div>
        </div>
    )
}

export default OutputComponent
