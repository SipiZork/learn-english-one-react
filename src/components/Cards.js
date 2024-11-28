import React, { useEffect, useState } from 'react';

const Cards = ({ cards, language }) => {
  console.log(cards);

  const [activeWord, setActiveWord] = useState(cards[0]);
  const [isFlipped, setIsFLipped] = useState(false);

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

  return (
    <div id="container">
      <div id="card-wrapper">
        <div id="card" onClick={handleFlip} className={isFlipped ? 'flipped' : ''}>
          <div id="font-card">{language === 'english' ? activeWord.english : activeWord.hungarian}</div>
          <div id="back-card">{language === 'english' ? activeWord.hungarian : activeWord.english}</div>
        </div>
      </div>
      <button type="button" id="next" onClick={selectNextWord} className='btn'>Következő</button>
    </div>
  );
};

export default Cards;