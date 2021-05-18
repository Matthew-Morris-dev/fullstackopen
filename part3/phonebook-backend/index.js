const express = require("express");
const app = express();

const persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((person) => {
        return person.id === id;
    });

    if (person !== undefined && person !== null) {
        res.json(person);
    } else {
        res.sendStatus(404);
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((person) => {
        return person.id === id;
    });

    if (person === undefined || person === null) {
        res.sendStatus(404);
    } else {
        const index = persons.indexOf(person);
        persons.splice(index, 1);
        res.sendStatus(204);
    }
});

app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info ${persons.length} people</p>
    <p>${new Date().toString()}</p>`);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
