
import './App.css';
import Search from './Search.js';
import React, {useState} from 'react';

const Banner = () => {
  return (
    <div style={{ background: 'green', padding: '10px', color: 'white' }}>
      Poly Nook
    </div>
  );
};

const SearchDatabase = (searchTerm) => {
  const promise = fetch(
    'http://localhost:8000/studyspaces/',
    {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(searchTerm)
    }
  );

  return promise;
}



function App() {
  const [bodyText, setBodyText] = useState(
    {
      text: ""
    }
  );
  const handleSearchSubmit = (searchTerm) => {
    console.log("We searched!");
    SearchDatabase(searchTerm).then(
      (response) => {
        if (response.status === 200){
          response.json().then((value)=>{setBodyText(value)}).catch(error => console.log(error))
        }
      }
    ).catch(error => console.log(error));
    return;
  } 
  return (
    <div className="App">
      <Banner />
      <Search handleSubmit={handleSearchSubmit}/>
      <div className="content">
        {
          <div className="content">
            <h1>Welcome to Poly Nook</h1>
            <p>Your resource for finding study spaces!</p>
            <p>{bodyText.text}</p>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
