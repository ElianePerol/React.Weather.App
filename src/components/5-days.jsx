import { useState, useEffect } from 'react';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';

export default function FiveDays() {
    const [city, setCity] = useState("Paris");
    const [coords, setCoords] = useState({ lat: null, lon: null });
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cityInput, setCityInput] = useState("");

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const apiKey = "d07567221cee6d6a6a960b8fb7ade661";

    // Fetch coordinate from city name
    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
                const response = await fetch(geoUrl);
                const data = await response.json();

                if (data.length > 0) {
                    setCoords({ lat: data[0].lat, lon: data[0].lon });
                    setError(null);
                } else {
                    throw new Error("City not found");
                }
            } catch (err) {
                setError(err.message);
                setCoords({ lat: null, lon: null });
                setLoading(false);
            }
        };

        fetchCoordinates();
    }, [city]);


    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!coords.lat || !coords.lon) return;

            try {
                setLoading(true);

                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
                const forecastResponse = await fetch(forecastUrl);
                const forecastData = await forecastResponse.json();
                setForecastData(forecastData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [coords]);

    const handleCityChange = (event) => {
        setCityInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCity(cityInput);
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    const groupByDay = () => {
        const days = {};
        forecastData.list.forEach((entry) => {
            const date = new Date(entry.dt * 1000).toLocaleDateString();
            if (!days[date]) days[date] = [];
            days[date].push(entry);
        });
        return days;
    };

    const forecastByDay = groupByDay();

    return (
        <Container className="d-flex flex-column align-items-center p-0">
            <h4 className="text-center mb-4 p-0">Météo BEEP BOOP à {capitalizeFirstLetter(city)}</h4>

            <Form onSubmit={handleSubmit} className="w-100">
                <Row className="mb-3 justify-content-center">
                    <Col xs={8} sm={4}>
                        <Form.Control
                            type="text"
                            value={cityInput}
                            onChange={handleCityChange}
                            placeholder="Entrez une ville" />
                    </Col>
                    <Col xs={7} sm={3}>
                        <Button type="submit" variant="secondary" className="w-100">
                            Rechercher
                        </Button>
                    </Col>
                </Row>
            </Form>

            <>
                {forecastData && (
                    <Row className="w-100 justify-content-center">
                        {Object.entries(forecastByDay).map(([date, entries], index) => (
                            <Col key={index} xs={12} sm={12} md={12} lg={12} className="mb-4">
                                <Card>
                                    <Card.Header className="text-center border-0">
                                        <h4>{date}</h4>
                                    </Card.Header>
                                    
                                    <Card.Body>
                                        <Row className="justify-content-center">
                                            
                                            {entries.map((entry, idx) => {
                                                const date = new Date(entry.dt * 1000);
                                                const hours = date.getHours().toString().padStart(2, '0');
                                                const minutes = date.getMinutes().toString().padStart(2, '0');
                                                const formattedTime = `${hours}h${minutes}`;

                                                return (
                                                    <Col key={idx} xs={12} sm={6} md={4} lg={3} className="pb-2">
                                                        <div className='text-center p-2'>
                                                            <strong>{formattedTime}</strong> <br />
                                                            <img src={`http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`} 
                                                                alt={entry.weather[0].description} 
                                                                style={{ width: "50px", height: "50px" }} /><br />
                                                            <strong> {Math.round(entry.main.temp * 2) / 2} °C </strong><br />
                                                            <strong>Vent:</strong> {Math.round((entry.wind.speed * 3.6).toFixed(1))} km/h <br />
                                                            <strong>Humidité:</strong> {entry.main.humidity} % 
                                                        </div>
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </>
        </Container>
      );
}
