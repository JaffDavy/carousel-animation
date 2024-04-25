import './App.css'
import Drink from './Components/DisplayDrinks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='hero-page'>
          <nav>
            <div id='nav-bar'>
              <div id='logo'>
              </div>
              <div id='par'>
                <p>Quench Your Thirst: Discover Refreshing Beverages with Arnolds Drinks app </p>
              </div>
              <div id='social-media'>
                <h3>FB</h3>
                <h3>TW</h3>
                <h3>IG</h3>
              </div>
            </div>
          </nav>

          <div id='page'>
            <div className='head'>
              <h3>OUR COCKTAILS</h3>
              <h3>OUR HISTORY</h3>
              <h3>CONTACT US</h3>
            </div>
              <Drink />
            <div id='buttons'>
            </div>
          </div>
        </div>
      </header>

    </div>
  );
}

export default App;