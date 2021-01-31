import React from 'react';
import Person from './Person';

const People = ({ filteredPersons }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => <Person person={person} />)} 
      </ul>
    </>
  );
}

export default People;