import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
function Registrations(props) {
    const location = useLocation()
    useEffect(() => {
        props.getRegistrations()
    }, [location])

    const unregisterForSpace = (roomId, email) => {
        const promise = fetch(
            `https://polynook.azurewebsites.net/unregisterSpace/${roomId}`,
            {
                method: 'DELETE',
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

    function handleUnregisterClick(event) {
        const roomId = event.target.getAttribute('data-room-id')
        if (props.profile === null) {
            return
        }
        unregisterForSpace(roomId, props.profile.email)
            .then((response) => {
                if (response.status === 200) {
                    alert('Unregistered!')
                    console.log('200 response')
                    props.getRegistrations()
                } else {
                    alert('An error occured: ' + response.status)
                }
            })
            .catch((error) => console.log(error))
        return
    }

    const renderedObjects =
        props.registrations == null
            ? []
            : props.registrations.map((object, index) => (
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
                      <p>
                          {'Schedule: ' +
                              (object.Schedule ? object.Schedule : 'NA')}
                      </p>
                      <p>
                          {'Current Availability: ' +
                              (object.CurrentAvailability
                                  ? object.CurrentAvailability
                                  : 'NA')}
                      </p>
                      <p>
                          {'Capacity: ' +
                              (object.Capacity ? object.Capacity : 'NA')}
                      </p>
                      <p>
                          {'Degree Level: ' +
                              (object.DegreeLevel ? object.DegreeLevel : 'NA')}
                      </p>
                      <p>{'Major: ' + (object.Major ? object.Major : 'NA')}</p>
                      {object.Computer ? (
                          <p>Has Computers</p>
                      ) : (
                          <p>No Computers</p>
                      )}
                      {object.AC ? <p>Air Conditioned</p> : <p>No AC</p>}
                      <p>Current Rating: {object.Rating}</p>
                      <button
                          className="button-3"
                          id="registerButton"
                          data-room-id={object.id}
                          onClick={handleUnregisterClick}
                      >
                          Unregister
                      </button>
                  </div>
              ))

    return (
        <div>
            {props.profile == null || props.registrations == null ? (
                <h1>Please Login to use the Registrations Page.</h1>
            ) : (
                <div>
                    <h1>
                        This is your registrations currently,{' '}
                        {props.profile.name}
                    </h1>
                    <div className="outputStyle">
                        <div className="outputWrapper">{renderedObjects}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Registrations
