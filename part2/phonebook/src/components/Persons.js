import React from "react";

const Persons = ({ contacts, deletePerson }) => {
    return (
        <ul>
            {contacts.map((person) => (
                <li key={person.id}>
                    {person.name} {person.number}{" "}
                    <button
                        onClick={() => {
                            deletePerson(person);
                        }}
                    >
                        delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default Persons;
