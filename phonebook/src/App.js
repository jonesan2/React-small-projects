import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import AddForm from './components/AddForm';
import People from './components/People';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [ filteredPersons, setFilteredPersons ] = useState(persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons);
        setFilteredPersons(allPersons);
      });
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
      personService
        .create({ name: newName, number: newNumber })
        .then(newPerson => {
          const newPersons = persons.concat(newPerson);
          setPersons(newPersons);
          setNewName('');
          setNewNumber('');
          setFilteredPersons(newPersons.filter(person => person.name.includes(newFilter)));
        });
    } else if (window.confirm(
      `${persons[idx].name} is already added to phonebook, replace the old number with a new one?`
      )) {
      personService
        .update(persons[idx].id, { name: newName, number: newNumber })
        .then(updatedPerson => {
          const newPersons = persons
            .filter(thisPerson => persons[idx].id !== thisPerson.id)
            .concat(updatedPerson);
          setPersons(newPersons);
          setNewName('');
          setNewNumber('');
          setFilteredPersons(newPersons.filter(thisPerson => thisPerson.name.includes(newFilter)));
        })
    }
  };

  const handleDelete = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(deletedPerson => {
          const newPersons = persons.filter(thisPerson => person.id !== thisPerson.id);
          setPersons(newPersons);
          setNewName('');
          setNewNumber('');
          setFilteredPersons(newPersons.filter(thisPerson => thisPerson.name.includes(newFilter)));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleTyping(setNewFilter)} />
      <AddForm handleSubmit={handleSubmit} newName={newName} handleTyping={handleTyping}
            setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <People filteredPersons={filteredPersons} handler={handleDelete} />
    </div>
  );
};

export default App;