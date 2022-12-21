import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CountryDetail from "./CountryDetails";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home /> }/>
      <Route path="/countries/:alpha3Code" element={<CountryDetail /> }/>

    </Routes>
  );
}

export default App;
