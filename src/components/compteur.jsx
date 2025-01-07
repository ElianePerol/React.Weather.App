import { useState } from "react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export default function Compteur() {
    const [count, setCount] = useState(0); // Initialisation avec une valeur de départ de 0

    const increaseCount = () => setCount(count + 1); // Mise à jour de l’état
  
    return (
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <h6 className="mb-4">Compteur</h6>
                <p className="display-6">{count}</p>
                <Button onClick={increaseCount} variant="secondary" className="w-auto mb-3">
                  Incrémenter
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
}