import React, { useEffect, useState } from 'react';

const Cards = ({ cards }) => {
  console.log(cards);

  const [activeWord, setActiveWord] = useState(cards[0]);
  const [isFlipped, setIsFLipped] = useState(false);
  const [language, setLanguage] = useState('english');

  const selectNextWord = () => {
    setIsFLipped(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      setActiveWord(cards[randomIndex]);
    }, 200);
  };

  const handleFlip = () => {
    setIsFLipped(prev => !prev);
  };

  const handleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'english') {
        return 'hungarian';
      } else {
        return 'english';
      }
    });
  };

  return (
    <div id="container">
      <div id="title"><h1>Tanulj szavakat!</h1></div>
      <button type="button" id="language-switch" onClick={handleLanguage}>{language === 'english' ? 'Magyar' : 'Angol'}</button>
      <div id="card-wrapper">
        <div id="card" onClick={handleFlip} className={isFlipped ? 'flipped' : ''}>
          <div id="font-card">{language === 'english' ? activeWord.english : activeWord.hungarian}</div>
          <div id="back-card">{language === 'english' ? activeWord.hungarian : activeWord.english}</div>
        </div>
      </div>
      <button type="button" id="next" onClick={selectNextWord}>Következő</button>
    </div>
  );
};

export default Cards;