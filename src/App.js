import logo from './logo.svg';
import './App.css';
import Cards from './components/Cards';
import React, { useState, useEffect } from 'react';

function App() {

  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./english_hungarian_words.json');

        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error('Hiba történt az adatok lekérésekor:', error);
      }
    };

    fetchData();
  }, []); // Ne felejtse el a függőségi tömböt
  if (words.length === 0) {
    return <div>Töltés...</div>;
  } else {
    return (
      <div className="App">

        <div id="loading"></div>
        <Cards cards={words} />
      </div>
    );
  };
}

export default App;
