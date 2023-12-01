import React from 'react';
import './RegisterButton.css';
import StarRating from './StarRating';

function OutputComponent({ objectList }) {
  const alertMessage = (input) => {
    alert(input);
  };

  const registerForSpace = (roomId) => {
    const promise = fetch(`http://localhost:8000/registerSpace/${roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return promise;
  };

  const sendRating = (value, roomId) => {
    const promise = fetch(`http://localhost:8000/sendRating/${roomId}/${value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return promise;
  };

  function handleRegisterClick(event) {
    const roomId = event.target.getAttribute('data-room-id');
    registerForSpace(roomId)
      .then((response) => {
        if (response.status === 200) {
          alertMessage('Registered!');
          console.log('200 response');
        } else {
          alertMessage('An error occurred: ' + response.status);
        }
      })
      .catch((error) => console.log(error));
    return;
  }

  function handleStarClick(value, roomId) {
    sendRating(value, roomId)
      .then((response) => {
        if (response.status === 200) {
          console.log('200 response');
        } else {
          alertMessage('An error occurred: ' + response.status);
        }
      })
      .catch((error) => console.log(error));
    return;
  }

  const renderedObjects = objectList.map((object, index) => (
    <div key={index} className="outputObject">
      <h3>{object.RoomNumber + ', ' + object.BuildingName}</h3>
      <p>{'Schedule: ' + (object.Schedule ? object.Schedule : 'NA')}</p>
      <p>
        {'Current Availability: ' +
          (object.CurrentAvailability ? object.CurrentAvailability : 'NA')}
      </p>
      <p>{'Capacity: ' + (object.Capacity ? object.Capacity : 'NA')}</p>
      <p>
        {'Degree Level: ' + (object.DegreeLevel ? object.DegreeLevel : 'NA')}
      </p>
      <p>{'Major: ' + (object.Major ? object.Major : 'NA')}</p>
      {object.Computer ? <p>Has Computers</p> : <p>No Computers</p>}
      {object.AC ? <p>Air Conditioned</p> : <p>No AC</p>}
      <div>
        <StarRating roomId={object.id} onStarClick={handleStarClick} />
      </div>
      <button
        className="button-3"
        data-room-id={object.id}
        onClick={handleRegisterClick}
      >
        Register
      </button>
    </div>
  ));

  return <div className="outputStyle">{renderedObjects}</div>;
}

export default OutputComponent;
