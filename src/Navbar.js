import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
    const data = await response.json();

    if (data.length > 0) {
      navigate(`/countries/${data[0].alpha3Code}`);
    } else {
      alert(`No countries found with name "${searchTerm}"`);
    }
  }

  return (
    <nav className='navbar'>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="search" className ="label">Search:</label>
        <input
          type="text"
          id="search"
          className ="input"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button className= "button" type="submit">Go</button>
      </form>
    </nav>
  );
}

export default Navbar;
