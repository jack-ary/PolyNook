
import './App.css';
import Search from './Search.js';

const Banner = () => {
  return (
    <div style={{ background: 'green', padding: '10px', color: 'white' }}>
      Poly Nook
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Banner />
      <Search />
      <div className="content">
        {
          <div className="content">
            <h1>Welcome to Poly Nook</h1>
            <p>Your resource for finding study spaces!</p>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
