import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis, } from 'react-speech-kit';

const Cards = ({ cards, language, read }) => {

  const [activeWord, setActiveWord] = useState(cards[Math.floor(Math.random() * cards.length)]);
  const [isFlipped, setIsFLipped] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speakable, setSpeakable] = useState(true);
  const { speak, voices } = useSpeechSynthesis();
  const [voiceIndex, setVoiceIndex] = useState(null);
  const voice = voices[voiceIndex] || null;

  const selectNextWord = () => {
    setIsFLipped(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      setActiveWord(cards[randomIndex]);
      if (language === 'english') {
        speakTheWord({ word: cards[randomIndex].english });
      }
    }, 200);
  };

  const setFirstWord = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setActiveWord(cards[randomIndex]);
    speakTheWord({ word: cards[randomIndex].english });
  };

  const handleFlip = () => {
    if (language === 'english' && isFlipped) {
      setSpeakable(true);
    } else if (language === 'hungarian' && !isFlipped) {
      setSpeakable(true);
    } else {
      setSpeakable(false);
    }
    setIsFLipped(prev => !prev);
  };

  const speakTheWord = ({ word }) => {
    if ((language === "english" || isFlipped) && read) {
      speak({ text: word, voice: selectedVoice });
    }
  };

  useEffect(() => {
    setFirstWord();
  }, []);

  useEffect(() => {
    console.log(`változás: ${language}`);
    if (language === 'english' && !isFlipped) {
      setSpeakable(true);
    } else if (language === 'hungarian' && !isFlipped) {
      setSpeakable(false);
    } else {
      setSpeakable(false);
    }
  }, [language]);

  useEffect(() => {
    if (voices.length > 0) {
      // Keresd meg az alapértelmezett nyelvet (pl. magyar)
      const defaultVoice = voices.find((voice) => voice.lang === 'en-US');
      // Angol nyelv
      setSelectedVoice(defaultVoice || voices[0]); // Ha nincs, az első hangot állítjuk be
    }
  }, [voices]);

  return (
    <div id="container">
      <div id="card-wrapper">
        <div id="speaker" className={speakable && read ? '' : 'hide'} onClick={() => speakTheWord({ word: activeWord.english })}>
          <img src="./images/icons/speaker.png" alt="Beszéd ikon" width="40px" height="40px" />
        </div>
        <div id="card" onClick={handleFlip} className={isFlipped ? 'flipped' : ''}>
          <div id="font-card">{language === 'english' ? activeWord.english : activeWord.hungarian}
          </div>
          <div id="back-card">{language === 'english' ? activeWord.hungarian : activeWord.english}</div>
        </div>
      </div>
      <button type="button" className="btn" >Olvasd</button>
      <button type="button" id="next" onClick={selectNextWord} className='btn'>Következő</button>
    </div>
  );
};

export default Cards;