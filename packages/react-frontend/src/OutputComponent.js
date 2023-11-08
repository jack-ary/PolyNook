
import React from 'react';
import './RegisterButton.css';

  function OutputComponent({ objectList }) {
    const handleClick = () => {
      alert('Button clicked!');
    };
    const renderedObjects = objectList.map((object, index) => (
        <div key={index}>
          <h3>{object.RoomNumber + ", " + object.BuildingName}</h3>
          <p>{"Schedule: " + (object.Schedule ? object.Schedule : "NA")}</p>
          <p>{"Current Availability: " + (object.CurrentAvailability ? object.CurrentAvailability : "NA")}</p>
          <p>{"Capacity: " + (object.Capacity ? object.Capacity : "NA")}</p>
          <p>{"Degree Level: " + (object.DegreeLevel ? object.DegreeLevel : "NA")}</p>
          <p>{"Major: " + (object.Major ? object.Major : "NA")}</p>
          {object.Computer ? (<p>Has Computers</p>) : (<p>No Computers</p>)}
          {object.AC ? (<p>Air Conditioned</p>) : (<p>No AC</p>)}
          <button class="button-3" onClick={handleClick}>Register</button>
        </div>
      ));

  return (
    <div className="outputStyle">
      <div className="content">
        {renderedObjects}
      </div>
    </div>
  );
}

export default OutputComponent;
