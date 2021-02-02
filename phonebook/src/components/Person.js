import React from 'react';

const Person = ({ person, handler }) => {
  return (
    <li>{person.name} {person.number}<button onClick={handler}>delete</button></li>
  );
}

export default Person;