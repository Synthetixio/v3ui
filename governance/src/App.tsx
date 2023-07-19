import logo from '/synthetix.svg';
import './App.css';

function App() {
  return (
    <>
      <div>
        <a href="https://synthetix.io" target="_blank" rel="noreferrer">
          <img src={logo} className="logo" alt="Synthetix logo" />
        </a>
      </div>
      <h1>Synthetix</h1>
    </>
  );
}

export default App;
