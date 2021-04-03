import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [notificationMessage, setNotificationMessage] = useState(null);

    const getPhonebook = () => {
        personsService.getAll().then((returnedPersons) => {
            setPersons(returnedPersons);
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
            handleUpdatePerson(newPerson);
            return;
        }

        personsService.create(newPerson).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNewName("");
            setNewNumber("");
            setNotificationMessage(`Added ${returnedPerson.name}`);
            setTimeout(() => {
                setNotificationMessage(null);
            }, 2000);
        });
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

    const handleDeletePerson = (personToDelete) => {
        let result = window.confirm(`Delete ${personToDelete.name}?`);
        if (result) {
            personsService.deletePerson(personToDelete).then((data) => {
                setPersons(persons.filter((person) => person.id !== personToDelete.id));
            });
        }
    };

    const handleUpdatePerson = (person) => {
        if (persons.some((oldPersonDetails) => oldPersonDetails.name === person.name && oldPersonDetails.number === person.number)) {
            alert(`${person.name} already exists in the phonebook with this number`);
            setNewName("");
            setNewNumber("");
            return;
        }

        const result = window.confirm(`${person.name} is already added to the phonebook, would you like to replace their old number with a new one?`);

        if (result) {
            const oldDetails = persons.filter((p) => p.name === person.name);

            const updatedPerson = { ...oldDetails[0], number: newNumber };

            personsService.update(updatedPerson).then((returnedPerson) => {
                setPersons(persons.map((currentPerson) => (currentPerson.id !== returnedPerson.id ? currentPerson : returnedPerson)));
                setNotificationMessage(`Updated ${returnedPerson.name}'s number`);
                setTimeout(() => {
                    setNotificationMessage(null);
                }, 2000);
            });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notificationMessage={notificationMessage} />
            <Filter filter={newFilter} handleChange={handleFilterChange} />
            <PersonForm handleAddPerson={addPerson} name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons contacts={personsToShow} deletePerson={handleDeletePerson} />
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
