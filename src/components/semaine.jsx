import { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

export default function Semaine() {
    const [city, setCity] = useState("Paris");
    const [coords, setCoords] = useState({ lat: null, lon: null });
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cityInput, setCityInput] = useState(""); // Track input field changes
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

                setWeatherData(weatherData);
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

    return (
        <Container>
          <h4 className="text-center mb-4 ">Météo à {capitalizeFirstLetter(city)}</h4>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs={8}>
                <Form.Control
                  type="text"
                  value={cityInput}
                  onChange={handleCityChange}
                  placeholder="Entrez une ville"
                />
              </Col>
              <Col xs={4}>
              < Button type="submit" variant="secondary">
                    Rechercher
                </Button>
              </Col>
            </Row>
          </Form>

            {forecastData && (
                <>
                    <h5 className="mt-4">Prévisions sur 5 jours (3h par intervalle)</h5>
                    <Row>
                        {forecastData.list.slice(0, 5).map((entry, index) => (
                            <Col key={index} xs={2}>
                                <p>{new Date(entry.dt * 1000).toLocaleDateString()}</p>
                                <p>{entry.main.temp} °C</p>
                                <p>{entry.weather[0].description}</p>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
    </Container>
      );
}
