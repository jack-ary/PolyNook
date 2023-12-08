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

function isEndTimeValid(startTime, endTime) {
    if (startTime == '') 
    {
        return true
    }
    return (parseTimeString(startTime) <= parseTimeString(endTime));
}

function parseTimeString(timeString) {
    const currentDate = new Date()
    const [time, period] = timeString.split(' ')
  
    let [hours, minutes] = time.split(':')
    hours = parseInt(hours)
    minutes = parseInt(minutes)
  
    if (period.toLowerCase() === 'pm' && hours < 12) {
      hours += 12
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hours = 0
    }
  
    const parsedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes)
    return parsedDate
}

export const SearchParams = (props) => {
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

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
        setStartTime(e.target.value)
        props.handleStartTimeChange(e.target.value)
    }

    function onChangeEndTime(e) {
        if (isEndTimeValid(startTime, e.target.value)){
            setEndTime(e.target.value)
            props.handleEndTimeChange(e.target.value)
        }
        else{
            alert('Invalid end time selected')
        }
    }

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <form>
                <label
                    htmlFor="StartTime"
                    style={{
                        marginBottom: '10px',
                        display: 'block',
                        fontSize: '17px',
                    }}
                >
                    Start Time
                </label>
                <select
                    id="StartTime"
                    name="StartTime"
                    disabled={!startTimesList.length}
                    value={startTime}
                    onChange={onChangeStartTime}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '5px',
                    }}
                >
                    <option value="" disabled>
                        Start Time
                    </option>
                    {startTimesList.map((range) => (
                        <option key={range} value={range}>
                            {range}
                        </option>
                    ))}
                </select>
            </form>
            <label>-</label>
            {/* End Time Elements */}
            <form>
                <label
                    htmlFor="EndTime"
                    style={{
                        marginBottom: '10px',
                        display: 'block',
                        fontSize: '17px',
                    }}
                >
                    End Time
                </label>
                <select
                    id="EndTime"
                    name="EndTime"
                    disabled={!endTimesList.length}
                    value={endTime}
                    onChange={onChangeEndTime}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '5px',
                    }}
                >
                    <option value="" disabled>
                        End Time
                    </option>
                    {endTimesList.map((range) => (
                        <option key={range} value={range}>
                            {range}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    )
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
        Schedule: '',
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

    function handleStartTimeChange(time) {
        setSearchTerm((prevState) => {
            let splitArray = prevState.Schedule.split(' - ')
            // Set a default end time of 11:00 pm. The latest possible. Only a place holder until a real end time is selected
            const endTime = splitArray[1] ? splitArray[1] : '11:00 pm'
            console.log('Start time inputted, schedule: ' + time + ' - ' + endTime)
            return {
                ...prevState,
                Schedule: `${time} - ${endTime}`,
            }
        })
    }

    function handleEndTimeChange(time) {
        setSearchTerm((prevState) => {
            if (isEndTimeValid(prevState.Schedule, time)) {
                let splitArray = prevState.Schedule.split(' - ')
                const startTime = splitArray[0] ? splitArray[0] : '7:10 am'
                console.log(`Valid end time, schedule: ${startTime} - ${time}`)
                return {
                    ...prevState,
                    Schedule: `${startTime} - ${time}`,
                }
            } else {
                // End time is not valid, ignore the update
                console.log(`Invalid end time, schedule: ${prevState.Schedule}`);
                return prevState
            }
        })
    }
    
    function submitForm(e) {
        props.handleSubmit(searchTerm)
        e.preventDefault()
        //could reset search term in bar here if desired
    }
    return (
        <div
            style={{
                ...main_style,
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#167519',
            }}
        >
            <form onSubmit={submitForm} autoComplete="off">
                <div
                    style={{
                        marginBottom: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                ></div>
                <label
                    htmlFor="searchName"
                    style={{
                        marginBottom: '10px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                >
                    Search for Study Rooms:
                </label>
                {/* Search input */}
                <input
                    style={{
                        ...accent_style,
                        marginBottom: '10px',
                        width: '250px',
                        padding: '8px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '15px',
                    }}
                    type="text"
                    name="searchName"
                    id="searchName"
                    value={searchTerm.searchName}
                    onChange={handleChange}
                    placeholder="Enter building name"
                />
                {/* "Show Advanced Options" checkbox */}
                <label
                    style={{
                        marginBottom: '5px',
                        fontSize: '17px',
                        color: 'white',
                    }}
                >
                    <input
                        type="checkbox"
                        name="showAdvancedOptions"
                        checked={showAdvancedOptions}
                        onChange={handleChange}
                    />
                    <span style={{ marginLeft: '4px' }}>
                        Show Advanced Options
                    </span>
                </label>
                {/* Checkboxes for computers, printers, scanner, photocopier, only shown when the toggle switch is checked */}
                {showAdvancedOptions && (
                    <div style={{ marginBottom: '15px', paddingLeft: '20px' }}>
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
                            <span style={{ marginLeft: '3px' }}>
                                Computer
                                <span style={{ marginLeft: '3px' }}></span>
                            </span>
                        </label>
                        <label>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="hasPrinters"
                                checked={searchTerm.hasPrinters}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>
                                Printer
                                <span style={{ marginLeft: '3px' }}></span>
                            </span>
                        </label>
                        <label>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="hasScanner"
                                checked={searchTerm.hasScanner}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>
                                Scanner
                                <span style={{ marginLeft: '3px' }}></span>
                            </span>
                        </label>
                        <label>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="hasPhotocopier"
                                checked={searchTerm.hasPhotocopier}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>
                                Photocopier
                            </span>
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
                            <span style={{ marginLeft: '3px' }}>
                                AC<span style={{ marginLeft: '3px' }}></span>
                            </span>
                        </label>
                        <label>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="noConditioning"
                                checked={searchTerm.noConditioning}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>
                                No AC<span style={{ marginLeft: '3px' }}></span>
                            </span>
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
                            <span style={{ marginLeft: '3px' }}>
                                Undergraduate
                                <span style={{ marginLeft: '3px' }}></span>
                            </span>
                        </label>
                        <label>
                            <input
                                style={accent_style}
                                type="checkbox"
                                name="hasGraduate"
                                checked={searchTerm.hasGraduate}
                                onChange={handleChange}
                            />
                            <span style={{ marginLeft: '3px' }}>
                                Graduate
                                <span style={{ marginLeft: '3px' }}></span>
                            </span>
                        </label>
                    </div>
                )}
            </form>
            <SearchParams
                handleStartTimeChange={(timerange) =>
                    handleStartTimeChange(timerange)
                }
                handleEndTimeChange={(timerange) =>
                    handleEndTimeChange(timerange)
                }
            />
            <input
                style={{
                    ...accent_style,
                    cursor: 'pointer',
                    marginTop: '15px',
                    padding: '12px 12px',
                    fontSize: '13px',
                    width: '8%',
                    border: '1px solid #ccc',
                }}
                type="button"
                value="Submit Search"
                onClick={submitForm}
            />
        </div>
    )
}

export default Search
