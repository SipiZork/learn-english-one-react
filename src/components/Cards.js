import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis, } from 'react-speech-kit';

const Cards = ({ cards, language }) => {

  const [activeWord, setActiveWord] = useState(cards[Math.floor(Math.random() * cards.length)]);
  const [isFlipped, setIsFLipped] = useState(false);
  const [wordSpeak, setWordSpeak] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const { speak, voices } = useSpeechSynthesis();
  const [voiceIndex, setVoiceIndex] = useState(null);
  const voice = voices[voiceIndex] || null

  const selectNextWord = () => {
    setIsFLipped(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      setActiveWord(cards[randomIndex]);
      setWordSpeak(cards[randomIndex].english);
      speak({ text: cards[randomIndex].english });

    }, 200);
  };

  const setFirstWord = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setActiveWord(cards[randomIndex]);
    setWordSpeak(cards[randomIndex].english);
    speakTheWord({ word: cards[randomIndex].english });
  }

  const handleFlip = () => {
    setIsFLipped(prev => !prev);
  };

  const handleSpeak = () => {

  };

  const speakTheWord = ({ word }) => {
    speak({ text: word, voice: selectedVoice });
  }

  useEffect(() => {
    setFirstWord();
  }, [])

  useEffect(() => {
    if (voices.length > 0) {
      // Keresd meg az alapértelmezett nyelvet (pl. magyar)
      const defaultVoice = voices.find((voice) => voice.lang === 'it-IT'); // Magyar nyelv
      setSelectedVoice(defaultVoice || voices[0]); // Ha nincs, az első hangot állítjuk be
    }
  }, [voices]);

  return (
    <div id="container">
      <div className='speechSettings'>
        <select
          name="voice"
          value={voiceIndex || ''}
          onChange={(e) => {
            setVoiceIndex(e.target.value);
          }}
        >
          {voices.map((option, index) => (
            <option key={option.voiceURI} value={index}>
              {`${option.lang} - ${option.name} ${option.default ? '- Default' : ''}`}
            </option>
          ))}
        </select>
      </div>
      {/*<div id="example">{activeWord.example}</div>*/}
      <div id="card-wrapper">
        <div id="card" onClick={handleFlip} className={isFlipped ? 'flipped' : ''}>
          <div id="font-card">{language === 'english' ? activeWord.english : activeWord.hungarian}</div>
          <div id="back-card">{language === 'english' ? activeWord.hungarian : activeWord.english}</div>
        </div>
      </div>
      <button type="button" className="btn" onClick={() => speakTheWord({ word: activeWord.english })}>Olvasd</button>
      <button type="button" id="next" onClick={selectNextWord} className='btn'>Következő</button>
    </div>
  );
};

export default Cards;