import React from 'react';
import CountryLine from './CountryLine';

const CountriesList = ({ countries, handler }) => {
  return (
    <>
      {countries.map(country => (
        <CountryLine key={country.name} country={country} handler={handler}/>
      ))}
    </>
  );
}

export default CountriesList;