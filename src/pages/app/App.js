import './App.css';
import Heure from '../../components/heure';
import Semaine from '../../components/semaine';
import Compteur from '../../components/compteur';

import { useState } from 'react';

const dataH = {
  temp : "29°C",
  wind : "20km/h",
  humidity : "87%"
}

const dataS = {
  temp : "17°C",
  wind : "50km/h",
  humidity : "78%"
}

function App() {

  const [affichage, setAffichage] = useState(false);

  const changeAffichage = () => {
    setAffichage( (val) => !val)
  }

  return (
    <div className="App">
        <h1>MÉTÉO</h1>

        <button onClick={changeAffichage}>Affichage par {affichage ? "heures" : "semaine"}</button>

        { !affichage && <Heure data={dataH}/>}
        { affichage && <Semaine />}

        <hr />

        <Compteur />
    </div>
  );
}

export default App;
