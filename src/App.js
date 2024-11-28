import logo from './logo.svg';
import './App.css';
import Cards from './components/Cards';
import React, { useState, useEffect } from 'react';

function App() {

  const [words, setWords] = useState([]);
  const [language, setLanguage] = useState('english');

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

  const handleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'english') {
        return 'hungarian';
      } else {
        return 'english';
      }
    });
  };

  if (words.length === 0) {
    return <div>Töltés...</div>;
  } else {
    return (
      <div className="App">
        <div id="header-container">
          <div id="title"><h1>Tanulj szavakat!</h1></div>
          <button type="button" id="language-switch" onClick={handleLanguage} className='btn'>{language === 'english' ? 'Magyar' : 'Angol'}</button>
        </div>
        <div id="loading"></div>
        <Cards cards={words} language={language} />
      </div>
    );
  };
}

export default App;
