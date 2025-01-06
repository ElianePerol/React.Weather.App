export default function Heure ({ data }) {
    return (
        <div>
            <h2>Affichage par heure</h2>
            <table border="1">
            <thead>
                <tr>
                <td>Température</td>
                <td>Vent</td>
                <td>Humidité</td>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>{data.temp}</td>
                <td>{data.wind}</td>
                <td>{data.humidity}</td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}