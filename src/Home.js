import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  const [countries, setCountries] = useState([]);
  const [chunks, setChunks] = useState([]);
  const [currentChunk, setCurrentChunk] = useState(() => 0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(() => data);

      const chunkSize = 5;
      const chunks = [];
      for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
      }
      setChunks(() => chunks);
    }

    fetchData();
  }, [countries, chunks]);

  const chunk = chunks[currentChunk] || [];
  return (
    <div className="container">
      <span>
        <Navbar />
      </span>
      <ul>
        {chunk.map((country) => (
          <li className="item" key={country.cca3}>
            <h3>
              <Link className="name" to={`/countries/${country.cca3}`}>
                + {country.name.common}
              </Link>{" "}
            </h3>
            <p>
              Region: {country.region}
              <br />
              Languages:{" "}
              {Object.values(country.languages)
                .map((language) => language)
                .join(", ")}{" "}
              <br />
              <img
                src={country.flags.svg}
                className="flag"
                alt={`Flag of ${country.name.common}`}
              />
            </p>
          </li>
        ))}
      </ul>
      {currentChunk > 0 && (
        <button
          className="button"
          onClick={() => setCurrentChunk((prevChunk) => prevChunk - 1)}>
          Prev
        </button>
      )}
      {currentChunk < chunks.length - 1 && (
        <button
          className="button"
          onClick={() => setCurrentChunk((prevChunk) => prevChunk + 1)}>
          Next
        </button>
      )}
    </div>
  );
}

export default Home;
