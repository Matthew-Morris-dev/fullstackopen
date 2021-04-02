import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    const getPhonebook = () => {
        axios.get("http://localhost:3001/persons").then((response) => {
            setPersons(response.data);
        });
    };

    useEffect(getPhonebook, []);

    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber
        };

        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    };

    const personsToShow = persons.filter((person) => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) > -1);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={newFilter} handleChange={handleFilterChange} />
            <PersonForm handleAddPerson={addPerson} name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons contacts={personsToShow} />
            {/* <ul>
                {personsToShow.map((person) => (
                    <li key={person.name}>
                        {person.name} {person.number}
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default App;
