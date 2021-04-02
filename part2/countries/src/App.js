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
        console.log(event.target.value);
        setSearch(event.target.value);
    };

    const updateDisplayCountries = () => {
        setCountriesToDisplay(countries.filter((country) => country.name.toLowerCase().indexOf(search.toLowerCase()) > -1));
    };

    useEffect(updateDisplayCountries, [search]);
    console.log(countriesToDisplay.length);

    return (
        <div>
            <SearchBar search={search} handleSearchChange={handleSearchChange} />
            <CountryDisplay countries={countriesToDisplay} />
        </div>
    );
    // if (countriesToDisplay.length == 1) {
    //     console.log("we get here 1");
    //     return (
    //         <div>
    //             find countries <input value={search} onChange={handleSearchChange} />
    //             <h1>{countriesToDisplay[0].name}</h1>
    //             <div>
    //                 <div>{countriesToDisplay[0].capital}</div>
    //                 <div>{countriesToDisplay[0].population}</div>
    //                 <h3>Languages</h3>
    //                 <ul>
    //                     {countriesToDisplay[0].languages.map((lang) => (
    //                         <li>{lang.name}</li>
    //                     ))}
    //                 </ul>
    //                 <img style={{ maxHeight: "150px", maxWidth: "200px" }} src={countriesToDisplay[0].flag} />
    //             </div>
    //         </div>
    //     );
    // } else if (countriesToDisplay.length > 10) {
    //     console.log("we get here 2");
    //     return (
    //         <div>
    //             {/* <div>
    //                 find countries <input value={search} onChange={handleSearchChange} />
    //             </div> */}
    //             <SearchBar search={search} handleSearchChange={handleSearchChange} />

    //         </div>
    //     );
    // } else {
    //     console.log("we get here 3");
    //     return (
    //         <div>
    //             find countries <input value={search} onChange={handleSearchChange} />
    //             <ul>
    //                 {countriesToDisplay.map((country) => (
    //                     <li key={country.name}>{country.name}</li>
    //                 ))}
    //             </ul>
    //         </div>
    //     );
    // }
}

export default App;
