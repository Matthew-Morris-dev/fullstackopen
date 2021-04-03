import DetailedCountryDisplay from "../components/DetailedCountryDisplay";

const CountryDisplay = ({ countries, handleShowClicked }) => {
    if (countries.length == 1) {
        return <DetailedCountryDisplay country={countries[0]} />;
    } else if (countries.length > 10) {
        return <div>Too many matches, please be more specific.</div>;
    } else {
        return (
            <ul>
                {countries.map((country) => (
                    <li key={country.name}>
                        {country.name}{" "}
                        <button
                            onClick={() => {
                                handleShowClicked(country.name);
                            }}
                        >
                            show
                        </button>
                    </li>
                ))}
            </ul>
        );
    }
};

export default CountryDisplay;
