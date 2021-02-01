import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './components/Display';

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ newMatches, setMatches ] = useState([]);
  const [ showIdx, setShowIdx ] = useState(-1);

  const handleShow = (countryName) => () => {
    setShowIdx(newMatches.findIndex(country => country.name === countryName));
  };

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
        setMatches(response.data);
      });
  }, []);

  const handleTyping = (event) => {
    setShowIdx(-1);
    setMatches(countries.filter(country => 
      country.name.toLowerCase().includes(event.target.value)));
  };
  
  return (
    <div>
      <p>find countries <input onChange={handleTyping} /></p>
      <Display countries={newMatches} handler={handleShow} showIdx={showIdx} />
    </div>
  );
}

export default App;
