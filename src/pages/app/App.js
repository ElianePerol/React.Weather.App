import './App.css';
import { Container, Card, Button} from 'react-bootstrap';
import Live from '../../components/live';
import FiveDays from '../../components/5-days';
import Compteur from '../../components/compteur';
import { useState } from 'react';

function App() {

  const [affichage, setAffichage] = useState(false);

  const changeAffichage = () => {
    setAffichage( (val) => !val)
  }

  return (
    <div className="App p-0">
      <Container className="p-0">
        <Card className="col-10 m-4 shadow-sm mx-auto">
          <Card.Body >

            <div className="text-center">
              <h2>
                {affichage ? "Météo en temps réel" : "Prévisions sur 5 jours"}
              </h2>

              <Button onClick={changeAffichage} variant="secondary" className="w-auto mb-3">
                Afficher {affichage ? "pour 5 jours" : "en temps réel"}
              </Button>

            </div>

            {affichage ? <Live /> : <FiveDays/>}


          </Card.Body>
        </Card>

        <Compteur />
      </Container>
    </div>
  );
}

export default App;
