import React from 'react';

const CountryLine = ({ country, handler }) => {
  return (
    <p>{country.name} <button onClick={handler(country.name)}>show</button></p>
  );
}

export default CountryLine;