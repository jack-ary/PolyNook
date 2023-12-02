import './App.css'
import React, { useState } from 'react'

const main_style = {
    background: '4CAF50',
    padding: '10px',
    color: 'white',
}
const accent_style = {
    background: '1px solid #ccc',
    color: 'black',
    margin: '3px',
}

export const SearchParams = (props) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const startTimesList = [
        '7:10 am',
        '8:10 am',
        '9:10 am',
        '10:10 am',
        '11:10 am',
        '12:10 pm',
        '1:10 pm',
        '2:10 pm',
        '3:10 pm',
        '4:10 pm',
        '5:10 pm ',
        '6:10 pm',
        '7:10 pm',
        '8:10 pm',
        '9:10 pm',
        '10:10 pm',
    ]

    const endTimesList = [
        '8:00 am',
        '9:00 am',
        '10:00 am',
        '11:00 am',
        '12:00 pm',
        '1:00 pm',
        '2:00 pm',
        '3:00 pm',
        '4:00 pm',
        '5:00 pm',
        '6:00 pm',
        '7:00 pm',
        '8:00 pm',
        '9:00 pm',
        '10:00 pm',
        '11:00 pm',
    ]

    function onChangeStartTime(e) {
        setStartTime(e.target.value);
        props.handleStartTimeChange(e.target.value);
    }
    
    function onChangeEndTime(e) {
        setEndTime(e.target.value);
        props.handleEndTimeChange(e.target.value);
    }

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <form>
                <label htmlFor="StartTime" style={{ marginBottom: '10px', display: 'block' , fontSize: '17px'}}>
                    Start Time
                </label>
                <select
                    id="StartTime"
                    name="StartTime"
                    disabled={!startTimesList.length}
                    value={startTime}
                    onChange={onChangeStartTime}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
                >
                    <option value="" disabled>Start Time</option>
                    {startTimesList.map((range) => (
                        <option key={range} value={range}>
                            {range}
                        </option>
                    ))}
                </select>
            </form>
            <label>
                -
            </label>
            {/* End Time Elements */}
            <form>
                <label htmlFor="EndTime" style={{ marginBottom: '10px', display: 'block' , fontSize: '17px'}}>
                    End Time
                </label>
                <select
                    id="EndTime"
                    name="EndTime"
                    disabled={!endTimesList.length}
                    value={endTime}
                    onChange={onChangeEndTime}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
                >
                    <option value="" disabled>End Time</option>
                    {endTimesList.map((range) => (
                        <option key={range} value={range}>
                            {range}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
}

function Search(props) {
    const [searchTerm, setSearchTerm] = useState({
        Building: '',
        Schedule: '',
        searchName: '',
        hasComputers: false,
        hasPrinters: false,
        hasScanner: false,
        hasPhotocopier: false,
        hasUndergraduate: false,
        hasGraduate: false,
        airConditioning: false,
        noConditioning: false,
        major: '',
    })
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

    function handleChange(event) {
        const { name, type, checked, value } = event.target

        if (type === 'checkbox') {
            if (name === 'showAdvancedOptions') {
                setShowAdvancedOptions(checked)

                // Clear suboptions when "Show Advanced Options" is unchecked
                if (!checked) {
                    setSearchTerm({
                        searchName: '',
                        hasComputers: false,
                        hasPrinters: false,
                        hasScanner: false,
                        hasPhotocopier: false,
                        hasUndergraduate: false,
                        hasGraduate: false,
                        airConditioning: false,
                        noConditioning: false,
                    })
                }
            } else {
                // Handle checkbox for tools and degree level
                setSearchTerm((prevState) => ({
                    ...prevState,
                    [name]: checked ? value : '',
                }))
            }
        } else if (name === 'searchName') {
            setSearchTerm({ Building: value, Schedule: searchTerm.Schedule })
        }
    }

    function handleDropdownChange(timerange, isStartTime) {
        setSearchTerm((prevState) => {
          if (isStartTime) {
            return {
              ...prevState,
              Schedule: timerange,
            };
          } else {
            if (isEndTimeValid(prevState.Schedule, timerange)) {
              return {
                ...prevState,
                Schedule: `${prevState.Schedule} - ${timerange}`,
              };
            } else {
              // End time is not valid, ignore the update
              return prevState;
            }
          }
        });
      }

    function isEndTimeValid(startTime, endTime) {
        const dateString ='2023-01-01';
        const startDate = new Date(`${dateString} ${startTime}`);
        const endDate = new Date(`${dateString} ${endTime}`);
        
        return startDate <= endDate;
    }

    function submitForm(e) {
        props.handleSubmit(searchTerm)
        e.preventDefault()
        //could reset search term in bar here if desired
    }
    return (
        <div style={{ ...main_style, marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' , background: '#167519'}}>
            <form onSubmit={submitForm} autoComplete="off">
                <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}></div>
                    <label htmlFor="searchName" style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                        Search for Study Rooms:
                    </label>
                    {/* Search input */}
                    <input
                        style={{ ...accent_style, marginBottom: '10px', width: '250px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '15px' }}
                        type="text"
                        name="searchName"
                        id="searchName"
                        value={searchTerm.searchName}
                        onChange={handleChange}
                        placeholder="Enter building name"
                    />
                {/* "Show Advanced Options" checkbox */}
                <label style={{ marginBottom: '5px', fontSize: '17px', color: 'white' }}>
                    <input
                        type="checkbox"
                        name="showAdvancedOptions"
                        checked={showAdvancedOptions}
                        onChange={handleChange}
                    />
                    <span style={{ marginLeft: '4px' }}>Show Advanced Options</span>
                </label>
                {/* Checkboxes for computers, printers, scanner, photocopier, only shown when the toggle switch is checked */}
                {showAdvancedOptions && (
                    <div style={{ marginBottom: '15px', paddingLeft: '20px'}}>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        Tools Available
                    </p>
                    <label style={{ marginBottom: '5px' }}>
                        <input
                            style={accent_style}
                            type="checkbox"
                            name="hasComputers"
                            checked={searchTerm.hasComputers}
                            onChange={handleChange}
                        />
                        <span style={{ marginLeft: '3px' }}>Computer<span style={{ marginLeft: '3px' }}></span></span>
                        </label>
                        <label>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="hasPrinters"
                                checked={searchTerm.hasPrinters}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>Printer<span style={{ marginLeft: '3px' }}></span></span>
                        </label>
                        <label>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="hasScanner"
                                checked={searchTerm.hasScanner}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>Scanner<span style={{ marginLeft: '3px' }}></span></span>
                        </label>
                        <label>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="hasPhotocopier"
                                checked={searchTerm.hasPhotocopier}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>Photocopier</span>
                        </label>
                        <p style={{ fontWeight: 'bold', margin: '10px 0 0' }}>
                            Air Conditioning
                        </p>
                        <label style={{ marginBottom: '5px' }}>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="airConditioning"
                                checked={searchTerm.airConditioning}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>AC<span style={{ marginLeft: '3px' }}></span></span>
                        </label>
                        <label>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="noConditioning"
                                checked={searchTerm.noConditioning}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>No AC<span style={{ marginLeft: '3px' }}></span></span>
                        </label>
                        <p style={{ fontWeight: 'bold', margin: '10px 0 0' }}>
                            Major
                        </p>
                        <label style={{ marginBottom: '5px' }}>
                        <input
                            style={accent_style}
                            type="checkbox"
                            name="major"
                            value="CSC"
                            checked={searchTerm.major === 'CSC'}
                            onChange={handleChange}
                        />
                        <span style={{ marginLeft: '3px' }}>CSC</span>
                    </label>
                        {/* Heading for Degree Level */}
                        <p style={{ fontWeight: 'bold', margin: '10px 0 0' }}>
                            Degree Level
                        </p>
                        {/* Add styling for degree level checkboxes */}
                        <label style={{ marginBottom: '5px' }}>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="hasUndergraduate"
                                checked={searchTerm.hasUndergraduate}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>Undergraduate<span style={{ marginLeft: '3px' }}></span></span>
                        </label>
                        <label>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="hasGraduate"
                                checked={searchTerm.hasGraduate}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>Graduate<span style={{ marginLeft: '3px' }}></span></span>
                        </label>
                    </div>
                )}
            </form>
            <SearchParams
                handleStartTimeChange={(timerange) => handleDropdownChange(timerange, true)}
                handleEndTimeChange={(timerange) => handleDropdownChange(timerange, false)}
            />
            <input
                style={{ ...accent_style, cursor: 'pointer', marginTop: '15px', padding: '12px 12px', fontSize: '13px' ,  width: '8%', border: '1px solid #ccc'}}
                type="button"
                value="Submit Search"
                onClick={submitForm}
            />
        </div>
    );
}

export default Search
