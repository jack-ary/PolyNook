import './App.css';
import React, {useState} from 'react';

const main_style={
    background: 'green',
    padding: '10px',
    color: 'white'
}
const accent_style={
    background: 'gold',
    color: 'black'
}

export const SearchParams = (props)=>{
  
  const [timeRange, setTimeRange] = useState("");
  const timesList = [
    '7:10 am - 8:00 am',
    '8:10 am - 9:00 am',
    '9:10 am - 10:00 am',
    '10:10 am - 11:00 am',
    '11:10 am - 12:00 pm',
    '12:10 pm - 1:00 pm',
    '1:10 pm - 2:00 pm',
    '2:10 pm - 3:00 pm',
    '3:10 pm - 4:00 pm',
    '4:10 pm - 5:00 pm',
    '5:10 pm - 6:00 pm',
    '6:10 pm - 7:00 pm',
    '7:10 pm - 8:00 pm',
    '8:10 pm - 9:00 pm',
    '9:10 pm - 10:00 pm',
    '10:10 pm - 11:00 pm'
  ];
  
    function onChange(e) {
        setTimeRange(e.target.value);
        console.log(e.target.value);
        props.handleTimeChange(e.target.value);
    }

  return (
    <form>
	<label htmlFor="TimeRange">
            TimeRange
           <select id="TimeRange" name="TimeRange" disabled={!timesList.length} 
                value={timeRange}  
                onChange={onChange}>
                 <option value="" />
                    {timesList.map(range => (
                          <option value={range}>{range}</option>
                      ))}
                </select>
              
              </label>
	</form>
)
}

function Search(props) {
    const [searchTerm, setSearchTerm] = useState(
        {
            Building: "",
            Schedule: ""
        }
    )

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "searchName") {
            //this should always be the case for now
            setSearchTerm(
                {Building: value,
                Schedule: searchTerm.Schedule}
            );
        }
    }

    function handleDropdownChange(timerange) {
        console.log(timerange);
        setSearchTerm(
            {
                Building: searchTerm.Building,
                Schedule: timerange
            }
        )
    }

    function submitForm(e) {
        props.handleSubmit(searchTerm);
        e.preventDefault();
        //could reset search term in bar here if desired
    }
    return (
        <div style={main_style}>
            <form onSubmit={submitForm} autoComplete='off'> {/* Address should be changed for our backend */}
                <label htmlFor='Search'>Search for Study Rooms: </label>
                <input style={accent_style} type='text' name='searchName' id='searchName' value={searchTerm.searchName} onChange={handleChange} />
                <input style={accent_style} type='button' value="Submit Search" onClick={submitForm} />
            </form>
            <SearchParams handleTimeChange={handleDropdownChange}/>
        </div>
    );
}

export default Search;