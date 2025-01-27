import React, { useEffect, useState } from 'react';
import './Dictionary.css';
import { useSpeechSynthesis } from 'react-speech-kit';

const Dictionary = ({ words }) => {
  const { speak, voices, cancel } = useSpeechSynthesis();
  const [englishVoice, setEnglishVoice] = useState(null);
  const [hungarianVoice, setHungarianVoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWords, setFilteredWords] = useState(words);

  useEffect(() => {
    if (voices.length > 0) {
      // Angol hang keresése
      const engVoice = voices.find(voice => voice.lang.startsWith('en-'));
      setEnglishVoice(engVoice || voices[0]);

      // Magyar hang keresése
      const hunVoice = voices.find(voice => voice.lang.startsWith('hu-'));
      setHungarianVoice(hunVoice || voices[0]);
    }
  }, [voices]);

  useEffect(() => {
    const filtered = words.filter(word =>
      word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.hungarian.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWords(filtered);
  }, [searchTerm, words]);

  const speakWord = (word, isEnglish) => {
    cancel();
    speak({
      text: word,
      voice: isEnglish ? englishVoice : hungarianVoice
    });
  };

  return (
    <div className="dictionary-container">
      <h2>Szótár</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Keresés angol vagy magyar szavak között..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="dictionary-table">
        <div className="table-header">
          <div>Angol</div>
          <div>Magyar</div>
          <div>Kiejtés</div>
          <div>Példamondat</div>
        </div>
        <div className="table-body">
          {filteredWords.map((word, index) => (
            <div key={index} className="table-row">
              <div className="word-cell">
                {word.english}
                <img
                  src="./images/icons/speaker.png"
                  alt="Beszéd ikon"
                  className="speaker-icon"
                  onClick={() => speakWord(word.english, true)}
                />
              </div>
              <div className="word-cell">
                {word.hungarian}
                <img
                  src="./images/icons/speaker.png"
                  alt="Beszéd ikon"
                  className="speaker-icon"
                  onClick={() => speakWord(word.hungarian, false)}
                />
              </div>
              <div>{word.pronunciation}</div>
              <div>{word.example}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;