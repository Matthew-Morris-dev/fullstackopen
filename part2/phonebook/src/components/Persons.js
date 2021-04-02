import React from "react";

const Persons = ({ contacts }) => {
    return (
        <ul>
            {contacts.map((person) => (
                <li key={person.name}>
                    {person.name} {person.number}
                </li>
            ))}
        </ul>
    );
};

export default Persons;
