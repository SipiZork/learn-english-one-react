import logo from './logo.svg';
import './App.css';
import Cards from './components/Cards';
import { WordType } from './constans/wordtypes';
import React, { useState, useEffect } from 'react';
import Dictionary from './components/Dictionary';

function App() {

  const [words, setWords] = useState([]);
  const [language, setLanguage] = useState('english');
  const [read, setRead] = useState(true);
  const [wordType, setWordType] = useState(WordType.ALL);
  const [activeWords, setActiveWords] = useState([]);
  const [currentPage, setCurrentPage] = useState('cards');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./updated_szavak_2.json');

        const data = await response.json();
        setWords(data);
        setActiveWords(data);
      } catch (error) {
        console.error('Hiba történt az adatok lekérésekor:', error);
      }
    };

    fetchData();
  }, []); // Ne felejtse el a függőségi tömböt

  useEffect(() => {
    if (wordType === WordType.ALL) {
      setActiveWords(words);
    }
    else {
      let actual = words.filter(e => e.type === wordType);

      setActiveWords(actual);
    }
  }, [wordType]);

  const handleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'english') {
        return 'hungarian';
      } else {
        return 'english';
      }
    });
  };

  const handleType = (e) => {
    if (e.target.value === 'all') {
      setWordType(WordType.ALL);
    }
    if (e.target.value === 'start') {
      setWordType(WordType.START);
    }
  };

  const handleRead = () => {
    setRead(prev => !prev);
  };

  if (words.length === 0) {
    return <div>Töltés...</div>;
  } else {
    return (
      <div className="App">
        <div id="header-container">
          <div id="title"><h1>Tanulj szavakat!</h1></div>
          <div id="buttons">
            <button
              type="button"
              onClick={() => setCurrentPage(prev => prev === 'cards' ? 'dictionary' : 'cards')}
              className='btn'
            >
              {currentPage === 'cards' ? 'Szótár' : 'Kártyák'}
            </button>
            {currentPage === 'cards' && (
              <>
                <select name="wordtypes" id="wordtypes" onChange={(e) => handleType(e)}>
                  {Object.values(WordType).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <button type="button" onClick={handleRead} className='btn'>
                  {read ? 'Némítás' : 'Felolvasás'}
                </button>
                <button type="button" onClick={handleLanguage} className='btn'>
                  {language === 'english' ? 'Magyar' : 'Angol'}
                </button>
              </>
            )}
          </div>
        </div>
        <div id="loading"></div>
        {currentPage === 'cards' ? (
          <Cards cards={activeWords} type={wordType} language={language} read={read} />
        ) : (
          <Dictionary words={words} />
        )}
      </div>
    );
  };
}

export default App;
