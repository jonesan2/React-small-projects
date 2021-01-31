import React, { useState } from 'react';
import Filter from './components/Filter';
import AddForm from './components/AddForm';
import People from './components/People';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ filteredPersons, setFilteredPersons ] = useState(persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');

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