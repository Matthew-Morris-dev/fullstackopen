import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" }
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

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
