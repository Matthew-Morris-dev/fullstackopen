import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = (person) => {
    const request = axios.post(baseUrl, person);
    return request.then((response) => response.data);
};

const update = (person) => {
    console.log(person);
    const request = axios.put(`${baseUrl}/${person.id}`, person);
    return request.then((request) => request.data);
};

const deletePerson = (person) => {
    const request = axios.delete(`${baseUrl}/${person.id}`);
    return request.then((request) => request.data);
};

export default { getAll, create, update, deletePerson };
