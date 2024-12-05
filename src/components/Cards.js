import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis, } from 'react-speech-kit';

const Cards = ({ cards, language, read, preWords, activePreWordIndex, setActivePreWordIndex, setPreWords, preWordIndex, setPreWordIndex }) => {

  const [activeWord, setActiveWord] = useState(cards[Math.floor(Math.random() * cards.length)]);
  const [isFlipped, setIsFLipped] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speakable, setSpeakable] = useState(true);
  const [pre, setPre] = useState(false);
  const [voiceIndex, setVoiceIndex] = useState(null);
  const { speak, voices, cancel } = useSpeechSynthesis();
  const voice = voices[voiceIndex] || null;

  const selectNextWord = () => {
    setIsFLipped(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cards.length);

      if (language === 'english') {
        setActiveWord(cards[randomIndex]);
        speakTheWord({ word: cards[randomIndex].english });
        setSpeakable(true);
      } else {
        setActiveWord(cards[randomIndex]);
        setSpeakable(false);
      }
    }, 200);
  };

  const setOptions = ({ active, preIndex }) => {
    console.log(active);

    setActivePreWordIndex(preIndex);
    setActiveWord(active);
  };

  const setFirstWord = () => {
    speakTheWord({ word: activeWord.english });
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
    cancel();
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
      <button type="button" id="next" onClick={selectNextWord} className='btn'>Következő</button>
    </div>
  );
};

export default Cards;