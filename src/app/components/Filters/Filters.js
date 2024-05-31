'use client'
import styles from './Filters.module.css'
import { useEffect, useState } from 'react'
function Filters({options}) {
  const [mood,setMood]=useState(null)
  const [bpm,setBPM]=useState(null)
  const [genre,setGenre]=useState(null)
  const [key,setKey]=useState(null)
  const [list,setList]=useState([])
useEffect(()=>{
  if(list.length>0){
    options(list)
    
  }else{
    // console.log('list empty')
  }
},[list])
const handleMoodChange = (e) => {
  setMood(e.target.value); 
  setList(prevList => {
    if (prevList.some(item => item.mood)) {
      return prevList.map(item => {
        if (item.mood) {
          return { ...item, mood: e.target.value };
        }
        return item;
      });
    } else {
      return [...prevList, { mood: e.target.value }];
    }
  });
};

const handleBPMChange = (e) => {
  setBPM(e.target.value); 
  setList(prevList => {
    if (prevList.some(item => item.bpm)) {
      return prevList.map(item => {
        if (item.bpm) {
          return { ...item, bpm: e.target.value };
        }
        return item;
      });
    } else {
      return [...prevList, { bpm: e.target.value }];
    }
  });
};

const handleGenreChange = (e) => {
  setGenre(e.target.value); 
  setList(prevList => {
    if (prevList.some(item => item.genre)) {
      return prevList.map(item => {
        if (item.genre) {
          return { ...item, genre: e.target.value };
        }
        return item;
      });
    } else {
      return [...prevList, { genre: e.target.value }];
    }
  });
};

const handleKeyChange = (e) => {
  setKey(e.target.value); 
  setList(prevList => {
    if (prevList.some(item => item.key)) {
      return prevList.map(item => {
        if (item.key) {
          return { ...item, key: e.target.value };
        }
        return item;
      });
    } else {
      return [...prevList, { key: e.target.value }];
    }
  });
};

  return (
    <div className={styles.contain}>
    <h3>Filters</h3>
    {/* fix html */}
    <h4>Choose a Mood:</h4>
    <select name="mood" id="1" onChange={handleMoodChange}>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="scary">Scary</option>
        <option value="mad">Mad</option>
    </select>
    <h4>Choose a bpm:</h4>
    <select name="bpm" id="2" onChange={handleBPMChange}>
        <option value="80">80</option>
        <option value="100">100</option>
        <option value="120">120</option>
        <option value="140">140</option>
    </select>
    <h4>Choose a genre:</h4>
    <select name="genre" id="3" onChange={handleGenreChange}>
        <option value="hiphop">hip hop</option>
        <option value="rock">rock</option>
        <option value="pop">pop</option>
        <option value="piano">piano</option>
    </select>
    <h4>Choose a key:</h4>
    <select name="key" id="4" onChange={handleKeyChange}>
        <option value="A">A</option>
        <option value="A#">A#</option>
        <option value="Bb">Bb</option>
        <option value="B">B</option>
    </select>

    </div>
  )
}

export default Filters