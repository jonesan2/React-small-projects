import React from 'react';
import CountriesList from './CountriesList';
import Detail from './Detail';

const Display = ({ countries, handler, showIdx }) => {

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    );
  } else if (countries.length === 1) {
    return (
      <Detail country={countries[0]} />
    );
  } else if (showIdx === -1) {
    return (
      <>
        <CountriesList countries={countries} handler={handler} />
      </>
    );
  } else {
    return (
      <>
        <CountriesList countries={countries} handler={handler} />
        <Detail country={countries[showIdx]} />
      </>
    );
  }
}

export default Display;