import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import AddForm from './components/AddForm';
import People from './components/People';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [ filteredPersons, setFilteredPersons ] = useState(persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
        setFilteredPersons(response.data);
      })
  }, []);

  const handleTyping = (setter) => (event) => {
    setter(event.target.value);
    if (setter === setNewFilter) {
      const newFilteredPersons = persons.filter(person => person.name.includes(event.target.value));
      setFilteredPersons(newFilteredPersons);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const idx = persons.findIndex(person => person.name === newName);

    if (idx === -1) {
      const newPersons = persons.concat({ name: newName, number: newNumber });
      setPersons(newPersons);
      setNewName('');
      setNewNumber('');
      setFilteredPersons(newPersons.filter(person => person.name.includes(newFilter)));
    } else {
      setNewName('');
      setNewNumber('');
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleTyping(setNewFilter)} />
      <AddForm handleSubmit={handleSubmit} newName={newName} handleTyping={handleTyping}
            setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <People filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;