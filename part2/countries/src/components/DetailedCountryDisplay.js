import WeatherDetails from "./WeatherDetails";

const DetailedCountryDisplay = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <div>
                <div>{country.capital}</div>
                <div>{country.population}</div>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map((lang) => (
                        <li>{lang.name}</li>
                    ))}
                </ul>
                <img style={{ maxHeight: "150px", maxWidth: "200px" }} src={country.flag} />
            </div>
            <WeatherDetails cityName={country.capital} />
        </div>
    );
};

export default DetailedCountryDisplay;
