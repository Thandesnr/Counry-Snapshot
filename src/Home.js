import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom'
import Navbar from './Navbar';

function Home() {
  const [countries,setCountries] = useState([]);
  const [chunks, setChunks] = useState([]);
  const [currentChunk, setCurrentChunk] = useState(() => 0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://restcountries.com/v2/all');
      const data = await response.json();
      setCountries(data);

      const chunkSize = 5;
      const chunks = [];
      for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
      }
      setChunks(()=> chunks);
    }

    fetchData();
  }, [countries,chunks]);

  const chunk = chunks[currentChunk] || [];
  return (
<div className='container'>
  <span>
    <Navbar />
  </span>
    <ul>
    {chunk.map((country) => (
    <li className='item' key={country.name}>
    <h3>
    <Link className='name' to={`/countries/${country.alpha3Code}`}>
      {country.name}
    </Link>
        </h3>
            <p>
              Region: {country.region}
              <br />
              Languages: {country.languages.map((language) => language.name).join(', ')}
              <br />
              Flag: <img src={country.flag} className="flag" alt={`Flag of ${country.name}`} />
            </p>
          </li>
        ))}
      </ul>
      {currentChunk > 0 && (
        <button className='button' onClick={() => setCurrentChunk((prevChunk) => prevChunk - 1)}>
          Prev
        </button>
      )}
      {currentChunk < chunks.length - 1 && (
        <button className='button' onClick={() => setCurrentChunk((prevChunk) => prevChunk + 1)}>
          Next
        </button>
      )}
    </div>
  );
}

export default Home;
