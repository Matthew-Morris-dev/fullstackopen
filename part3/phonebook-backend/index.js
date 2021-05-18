const express = require("express");

const app = express();

app.use(express.json());

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

app.post("/api/persons", (req, res) => {
    const body = req.body;

    if (body.name === null || body.name === undefined) {
        res.status(400).send("'name' is a required field.");
    }

    if (body.number === null || body.number === undefined) {
        res.status(400).send("'number' is a required field.");
    }

    const newPerson = {
        id: Math.ceil(Math.random() * 10000),
        name: body.name,
        number: body.number,
    };

    persons.push(newPerson);

    res.status(201).send(newPerson);
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
