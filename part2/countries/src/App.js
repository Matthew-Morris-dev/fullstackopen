import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CountryDisplay from "./components/CountryDisplay";

function App() {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [countriesToDisplay, setCountriesToDisplay] = useState([]);

    const getCountries = () => {
        axios.get("http://restcountries.eu/rest/v2/all").then((response) => {
            console.log(response.data);
            setCountries(response.data);
        });
    };

    useEffect(getCountries, []);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const updateDisplayCountries = () => {
        setCountriesToDisplay(countries.filter((country) => country.name.toLowerCase().indexOf(search.toLowerCase()) > -1));
    };

    useEffect(updateDisplayCountries, [search]);

    const showClicked = (countryName) => {
        const selectedCountry = countriesToDisplay.filter((country) => country.name.toLowerCase() === countryName.toLowerCase());
        setCountriesToDisplay(selectedCountry);
    };

    return (
        <div>
            <SearchBar search={search} handleSearchChange={handleSearchChange} />
            <CountryDisplay countries={countriesToDisplay} handleShowClicked={showClicked} />
        </div>
    );
}

export default App;
