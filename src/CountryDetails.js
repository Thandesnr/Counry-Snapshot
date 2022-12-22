import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CountryDetail() {
  const { alpha3Code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${alpha3Code}`);
      const data = await response.json();
      setCountry(() => data);
    }

    fetchData();
  }, [alpha3Code]);

  if (!country) {
    return null;
  }
  return (
    <div className="container">
      <h2>{country.name}</h2>
      <p>
        Region: {country.region}
        <br />
        Languages: {country.languages.map((language) => language.name).join(', ')}
        <br />
        Currencies: {country.currencies.map((currency) => currency.name).join(', ')}
        <br />
        Population: {country.population.toLocaleString()}
      </p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default CountryDetail;
