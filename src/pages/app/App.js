import './App.css';
import { Container, Card, Button} from 'react-bootstrap';
import Heure from '../../components/heure';
import Semaine from '../../components/semaine';
import Compteur from '../../components/compteur';

import { useState } from 'react';

const dataH = {
  temp : "29°C",
  wind : "20km/h",
  humidity : "87%"
}

function App() {

  const [affichage, setAffichage] = useState(false);

  const changeAffichage = () => {
    setAffichage( (val) => !val)
  }

  return (
    <div className="App">
      <Container className="p-4">
        <Card className="col-6 m-4 shadow-sm mx-auto">
          <Card.Body>

            <div className="text-center">
              <h2>
                {affichage ? "Météo en temps réel" : "Prévisions sur 5 jours"}
              </h2>

              <Button onClick={changeAffichage} variant="secondary" className="w-auto mb-3">
                Afficher par {affichage ? "semaine" : "heures"}
              </Button>

            </div>

            {affichage ? <Heure /> : <Semaine/>}


          </Card.Body>
        </Card>

        <Compteur />
      </Container>
    </div>
  );
}

export default App;
