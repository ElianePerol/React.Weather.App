import { useState, useEffect } from 'react';

export default function Semaine({ datas }) {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const apiKey = "d07567221cee6d6a6a960b8fb7ade661";
            const city = "Paris";
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=en&units=metric`;
            
            try {
                setLoading(true);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchWeatherData();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <h1>Données Météo</h1>
            {weatherData ? (
            <div>
                <p><strong>Ville :</strong> {weatherData.name}</p>
                <p><strong>Date et heure :</strong> {new Date().toLocaleString()}</p>
                <p><strong>Ville :</strong> {weatherData.name}</p>
                <p><strong>Température :</strong> {weatherData.main.temp} °C</p>
                <p><strong>Conditions :</strong> {weatherData.weather[0].description}</p>
                <p><strong>Humidité :</strong> {weatherData.main.humidity}%</p>
                <p><strong>Vent :</strong> {weatherData.wind.speed} m/s</p>
            </div>
            ) : (
                <p>Aucune donnée disponible</p>
            )}
        </div>
    );

}