import { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

export default function Live() {
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

                const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
                const weatherResponse = await fetch(currentWeatherUrl);
                const weatherData = await weatherResponse.json();


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
        <Container className="d-flex flex-column align-items-center p-0">
          <h4 className="text-center mb-4 p-0">Météo à {capitalizeFirstLetter(city)}</h4>

          <Form onSubmit={handleSubmit} className="w-100">
            <Row className="mb-3 justify-content-center">
              <Col xs={8} sm={4}>
                <Form.Control
                  type="text"
                  value={cityInput}
                  onChange={handleCityChange}
                  placeholder="Entrez une ville"
                />
              </Col>
              <Col xs={7} sm={3}>
              < Button type="submit" variant="secondary" className="w-100">
                    Rechercher
                </Button>
              </Col>
            </Row>
          </Form>

             {weatherData && (
                <>
                    <Row className="mt-4 bm-4 justify-content-center w-100">
                        <Col xs={12} sm={6} md={4} lg={2} className="d-flex flex-column p-1">
                            <div className="card shadow-sm p-0" style={{ height: '330px'}}>
                                <div className="card-body text-center">
                                    <h5>{new Date().toLocaleString()}</h5>
                                    <strong>Température :</strong><p> {weatherData.main.temp} °C</p>
                                    <strong>Conditions :</strong><p> {weatherData.weather[0].description}</p>
                                    <strong>Vent :</strong><p> {weatherData.wind.speed} m/s</p>
                                    <strong>Humidité :</strong><p> {weatherData.main.humidity}%</p>
                                </div>
                            </div>
                        </Col>                       
                    </Row>
                </>
            )}
            

    </Container>
      );
}
