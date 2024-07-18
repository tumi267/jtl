'use client'

import { useEffect, useState } from 'react';
import styles from './Filters.module.css';

function Filters({ options }) {
  const [mood, setMood] = useState(null);
  const [bpm, setBPM] = useState(null);
  const [genre, setGenre] = useState(null);
  const [key, setKey] = useState(null);
  const [list, setList] = useState([]);

  // Update options whenever the list changes
  useEffect(() => {
    if (list.length > 0) {
      options(list);
    } else {
      // console.log('list empty')
    }
  }, [list, options]);

  const handleMoodChange = (e) => {
    setMood(e.target.value);
    updateList('mood', e.target.value);
  };

  const handleBPMChange = (e) => {
    setBPM(e.target.value);
    updateList('bpm', e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    updateList('genre', e.target.value);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
    updateList('key', e.target.value);
  };

  // Update the list state with new values or update existing ones
  const updateList = (type, value) => {
    setList((prevList) => {
      if (prevList.some(item => item[type])) {
        return prevList.map(item => {
          if (item[type]) {
            return { ...item, [type]: value };
          }
          return item;
        });
      } else {
        return [...prevList, { [type]: value }];
      }
    });
  };

  return (
    <div className={styles.contain}>
      <h3>Filters</h3>
      {/* Fix HTML elements */}
      <h4>Choose a Mood:</h4>
      <select name="mood" id="mood" onChange={handleMoodChange}>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="scary">Scary</option>
        <option value="mad">Mad</option>
      </select>
      <h4>Choose a BPM:</h4>
      <select name="bpm" id="bpm" onChange={handleBPMChange}>
        <option value="80">80</option>
        <option value="100">100</option>
        <option value="120">120</option>
        <option value="140">140</option>
      </select>
      <h4>Choose a Genre:</h4>
      <select name="genre" id="genre" onChange={handleGenreChange}>
        <option value="hiphop">Hip Hop</option>
        <option value="rock">Rock</option>
        <option value="pop">Pop</option>
        <option value="piano">Piano</option>
      </select>
      <h4>Choose a Key:</h4>
      <select name="key" id="key" onChange={handleKeyChange}>
        <option value="A">A</option>
        <option value="A#">A#</option>
        <option value="Bb">Bb</option>
        <option value="B">B</option>
      </select>
    </div>
  );
}

export default Filters;
