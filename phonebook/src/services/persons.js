import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data);
};

const create = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then(response => response.data)
    .catch(error => error.response.data)
};

const update = (id, newPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then(response => response.data)
    .catch(() => {});
}

const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`) 
    .then(response => response.data);
};

const persons = { getAll, create, update, deletePerson };

export default persons;