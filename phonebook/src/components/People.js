import React from 'react';
import Person from './Person';

const People = ({ filteredPersons, handler }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => <Person key={person.id} person={person} handler={handler(person)}/>)}
      </ul>
    </>
  );
}

export default People;