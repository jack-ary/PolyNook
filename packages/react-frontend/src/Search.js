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

function Search(props) {
    const [searchTerm, setSearchTerm] = useState(
        {
            searchName: ""
        }
    )

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "searchName") {
            //this should always be the case for now
            setSearchTerm(
                {searchName: value}
            );
        }
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
        </div>
    );
}

export default Search;